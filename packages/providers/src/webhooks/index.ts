import { createHmac, timingSafeEqual } from 'node:crypto';

import { AppError } from '@monorepo-boilerplate/types';
import type { z } from 'zod';

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
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  const expectedBytes = Buffer.from(expected);
  const actualBytes = Buffer.from(signature);
  return expectedBytes.length === actualBytes.length && timingSafeEqual(expectedBytes, actualBytes);
}

/**
 * Verify a signed webhook and parse its JSON body against a schema. Throws an
 * `UNAUTHORIZED` AppError on a bad signature and `VALIDATION` on a bad payload —
 * so a route handler can map the error straight to an HTTP status.
 */
export function parseSignedWebhook<T>(args: WebhookVerification, schema: z.ZodType<T>): T {
  if (!verifyWebhookSignature(args)) {
    throw new AppError('Invalid webhook signature', { code: 'UNAUTHORIZED' });
  }
  const parsed = schema.safeParse(JSON.parse(args.payload));
  if (!parsed.success) {
    throw new AppError('Invalid webhook payload', {
      code: 'VALIDATION',
      details: { issues: parsed.error.issues },
    });
  }
  return parsed.data;
}
