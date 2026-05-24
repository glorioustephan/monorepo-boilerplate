import { z } from "zod";

import { createJsonClient } from "../http";
import { retry } from "../resilience";

const exampleUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type ExampleUser = z.infer<typeof exampleUserSchema>;

export interface ExampleProviderOptions {
  readonly apiKey: string;
  readonly baseUrl?: string;
}

export interface ExampleProvider {
  getUser(id: string): Promise<ExampleUser>;
}

/**
 * Reference provider. Copy this folder to add a real integration: define
 * response schemas, build a client, expose typed methods, and add resilience
 * (retry/timeout/rate limiting) from `../resilience` where appropriate.
 */
export function createExampleProvider(options: ExampleProviderOptions): ExampleProvider {
  const client = createJsonClient({
    baseUrl: options.baseUrl ?? "https://api.example.com",
    headers: { authorization: `Bearer ${options.apiKey}` },
  });

  return {
    getUser: (id: string): Promise<ExampleUser> =>
      retry(() => client.get(`/users/${encodeURIComponent(id)}`, exampleUserSchema), {
        retries: 2,
      }),
  };
}
