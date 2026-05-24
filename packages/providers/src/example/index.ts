import { createHmac, timingSafeEqual } from "node:crypto";

import { z } from "zod";

import { createJsonClient } from "../http";

const exampleUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type ExampleUser = z.infer<typeof exampleUserSchema>;

export interface ExampleProviderOptions {
  readonly apiKey: string;
  readonly baseUrl?: string;
}

/**
 * Reference provider. Copy this folder to add a real integration: define
 * response schemas, build a client, and expose typed methods.
 */
export function createExampleProvider(options: ExampleProviderOptions) {
  const client = createJsonClient({
    baseUrl: options.baseUrl ?? "https://api.example.com",
    headers: { authorization: `Bearer ${options.apiKey}` },
  });

  return {
    getUser: (id: string): Promise<ExampleUser> =>
      client.get(`/users/${encodeURIComponent(id)}`, exampleUserSchema),
  };
}

export interface WebhookVerification {
  readonly payload: string;
  readonly signature: string;
  readonly secret: string;
}

/** Verify an HMAC-SHA256 webhook signature in constant time. */
export function verifyWebhookSignature({
  payload,
  signature,
  secret,
}: WebhookVerification): boolean {
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const expectedBytes = Buffer.from(expected);
  const actualBytes = Buffer.from(signature);
  return expectedBytes.length === actualBytes.length && timingSafeEqual(expectedBytes, actualBytes);
}
