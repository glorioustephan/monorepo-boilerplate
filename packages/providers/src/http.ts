import type { z } from "zod";

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
        throw new Error(`GET ${path} failed: ${response.status} ${response.statusText}`);
      }
      const data: unknown = await response.json();
      return schema.parse(data);
    },
  };
}
