/**
 * A small, shared error taxonomy. Use {@link AppError} for expected,
 * domain-level failures so callers (and HTTP/route handlers) can branch on a
 * stable `code` and map to a status. Reserve thrown raw `Error`s for bugs.
 */

export type ErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "TIMEOUT"
  | "PROVIDER_ERROR"
  | "INTERNAL";

const DEFAULT_STATUS: Record<ErrorCode, number> = {
  VALIDATION: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  TIMEOUT: 504,
  PROVIDER_ERROR: 502,
  INTERNAL: 500,
};

export interface AppErrorOptions {
  readonly code?: ErrorCode;
  readonly cause?: unknown;
  readonly status?: number;
  readonly details?: Record<string, unknown>;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: Record<string, unknown>;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "AppError";
    this.code = options.code ?? "INTERNAL";
    this.status = options.status ?? DEFAULT_STATUS[this.code];
    this.details = options.details;
  }
}

export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}

/** Coerce any thrown value into an {@link AppError}, preserving the cause. */
export function toAppError(value: unknown): AppError {
  if (isAppError(value)) return value;
  if (value instanceof Error) return new AppError(value.message, { cause: value });
  return new AppError("Unknown error", { details: { value } });
}
