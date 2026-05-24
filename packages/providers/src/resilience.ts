import { AppError } from "@monorepo-boilerplate/types";

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
      await sleep(baseDelayMs * factor ** attempt);
      attempt += 1;
    }
  }
  /* eslint-enable no-await-in-loop */
  // Unreachable: the loop either returns or throws.
  throw new AppError("retry exhausted", { code: "INTERNAL" });
}

/** Reject with a `TIMEOUT` AppError if `promise` doesn't settle within `ms`. */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label = "operation",
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new AppError(`${label} timed out after ${ms}ms`, { code: "TIMEOUT" })),
      ms,
    );
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
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
