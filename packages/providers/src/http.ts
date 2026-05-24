import { AppError, type ErrorCode } from "@monorepo-boilerplate/types";
import type { z } from "zod";

/** Map an upstream HTTP status to the closest AppError code. */
function codeForStatus(status: number): ErrorCode {
  switch (status) {
    case 400:
      return "VALIDATION";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 409:
      return "CONFLICT";
    case 429:
      return "RATE_LIMITED";
    default:
      return status >= 500 ? "PROVIDER_ERROR" : "INTERNAL";
  }
}

export interface JsonClientOptions {
  readonly baseUrl: string;
  readonly headers?: Readonly<Record<string, string>>;
}

export interface JsonClient {
  get<T>(path: string, schema: z.ZodType<T>): Promise<T>;
}

/**
 * A tiny typed `fetch` wrapper: every response is parsed through a zod schema,
 * so callers receive validated, fully-typed data instead of `unknown`.
 */
export function createJsonClient(options: JsonClientOptions): JsonClient {
  const { baseUrl, headers } = options;

  return {
    async get<T>(path: string, schema: z.ZodType<T>): Promise<T> {
      const response = await fetch(new URL(path, baseUrl), { headers });
      if (!response.ok) {
        throw new AppError(`GET ${path} failed: ${response.status} ${response.statusText}`, {
          code: codeForStatus(response.status),
          status: response.status,
        });
      }
      const data: unknown = await response.json();
      return schema.parse(data);
    },
  };
}
