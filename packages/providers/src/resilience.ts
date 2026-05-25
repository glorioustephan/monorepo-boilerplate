import { AppError } from '@monorepo-boilerplate/types';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export interface RetryOptions {
  /** Max additional attempts after the first (default 3). */
  readonly retries?: number;
  /** Base backoff in ms (default 100). */
  readonly baseDelayMs?: number;
  /** Exponential factor (default 2). */
  readonly factor?: number;
  /** Decide whether a given error is retryable (default: always). */
  readonly shouldRetry?: (error: unknown) => boolean;
}

/** Retry an async operation with exponential backoff. */
export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const retries = options.retries ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 100;
  const factor = options.factor ?? 2;
  const shouldRetry = options.shouldRetry ?? (() => true);

  let attempt = 0;
  /* eslint-disable no-await-in-loop -- retry attempts are intentionally sequential */
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries || !shouldRetry(error)) throw error;
      // Full jitter (random within the exponential window) avoids a thundering
      // herd when many clients back off against the same dependency at once.
      const window = baseDelayMs * factor ** attempt;
      await sleep(Math.random() * window);
      attempt += 1;
    }
  }
  /* eslint-enable no-await-in-loop */
  // Unreachable: the loop either returns or throws.
  throw new AppError('retry exhausted', { code: 'INTERNAL' });
}

/**
 * Run `fn` with a deadline. On timeout, the passed `AbortSignal` is aborted (so
 * the underlying work — `fetch`, a DB query — can cancel and free its resources)
 * and a `TIMEOUT` AppError is thrown. Pass the signal through to your I/O:
 *
 *   withTimeout((signal) => fetch(url, { signal }), 5000)
 */
export async function withTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  ms: number,
  label = 'operation',
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fn(controller.signal);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new AppError(`${label} timed out after ${ms}ms`, { code: 'TIMEOUT', cause: error });
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

/** Simple token-bucket rate limiter. */
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private readonly capacity: number,
    private readonly refillPerSecond: number,
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSeconds * this.refillPerSecond);
    this.lastRefill = now;
  }

  /** Consume a token if available; returns false if the bucket is empty. */
  tryAcquire(): boolean {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}
