/**
 * Cross-cutting types shared across apps and packages.
 *
 * Keep this package intentionally small. A type belongs here only when it is
 * used by more than one package AND is not owned by any single one of them.
 * Types tied to a feature should live with that feature's package instead.
 */

export { AppError, isAppError, toAppError, type AppErrorOptions, type ErrorCode } from './errors';

/** A discriminated result type for operations that can fail without throwing. */
export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

/** Wrap a success value in a {@link Result}. */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/** Wrap a failure value in a {@link Result}. */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * Nominal/branded type helper. Use to make structurally-identical primitives
 * distinct at the type level, e.g. `type UserId = Brand<string, "UserId">`.
 */
export type Brand<T, B extends string> = T & { readonly __brand: B };

/** Recursively marks every property of `T` as readonly. */
export type DeepReadonly<T> =
  T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

/** Make selected keys `K` of `T` optional, leaving the rest untouched. */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** A value that may not be present. */
export type Maybe<T> = T | null | undefined;
