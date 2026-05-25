/**
 * Provider-agnostic session primitives. This module does NOT pick an identity
 * provider — it gives you a tamper-proof, expiring session token (HMAC-SHA256
 * over a JSON payload). Wire your own login that, on success, `seal()`s a payload
 * into a cookie.
 *
 * Runtime: Node (uses `node:crypto` for a constant-time comparison and `Buffer`
 * for base64url). The Next proxy runs on the Node runtime, so it can import this.
 */

import { timingSafeEqual } from 'node:crypto';

const encoder = new TextEncoder();

function toBase64Url(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

async function sign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Buffer.from(new Uint8Array(signature)).toString('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const aBytes = Buffer.from(a);
  const bBytes = Buffer.from(b);
  // timingSafeEqual requires equal-length inputs; the length guard only leaks
  // the (fixed, public) length of an HMAC-SHA256 digest, not secret material.
  return aBytes.length === bBytes.length && timingSafeEqual(aBytes, bBytes);
}

interface SealedEnvelope {
  data: Record<string, unknown>;
  exp: number;
}

function isSealedEnvelope(value: unknown): value is SealedEnvelope {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.exp === 'number' && typeof record.data === 'object' && record.data !== null;
}

export interface SessionCodecOptions {
  /** HMAC signing secret. Use a long, random value from validated env. */
  readonly secret: string;
  /** Session lifetime in seconds. */
  readonly ttlSeconds: number;
}

export interface SessionCodec<T extends Record<string, unknown>> {
  /** Produce a signed, expiring token for `payload`. */
  seal(payload: T): Promise<string>;
  /** Verify a token and return its payload, or `null` if invalid/expired. */
  unseal(token: string): Promise<T | null>;
}

/** Create a session codec bound to a secret and TTL. */
export function createSessionCodec<T extends Record<string, unknown>>(
  options: SessionCodecOptions,
): SessionCodec<T> {
  const { secret, ttlSeconds } = options;

  return {
    async seal(payload: T): Promise<string> {
      const envelope: SealedEnvelope = { data: payload, exp: Date.now() + ttlSeconds * 1000 };
      const payloadB64 = toBase64Url(JSON.stringify(envelope));
      const signature = await sign(secret, payloadB64);
      return `${payloadB64}.${signature}`;
    },

    async unseal(token: string): Promise<T | null> {
      const [payloadB64, signature] = token.split('.');
      if (!payloadB64 || !signature) return null;

      const expected = await sign(secret, payloadB64);
      if (!safeEqual(signature, expected)) return null;

      let parsed: unknown;
      try {
        parsed = JSON.parse(fromBase64Url(payloadB64));
      } catch {
        return null;
      }
      if (!isSealedEnvelope(parsed) || parsed.exp < Date.now()) return null;
      return parsed.data as T;
    },
  };
}
