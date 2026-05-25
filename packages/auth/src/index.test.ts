import { describe, expect, it } from 'vitest';

import { createSessionCodec } from './index';

interface Session extends Record<string, unknown> {
  userId: string;
  email: string;
}

const codec = createSessionCodec<Session>({ secret: 'test-secret', ttlSeconds: 3600 });

describe('session codec', () => {
  it('round-trips a payload', async () => {
    const token = await codec.seal({ userId: 'u1', email: 'a@b.com' });
    await expect(codec.unseal(token)).resolves.toEqual({ userId: 'u1', email: 'a@b.com' });
  });

  it('rejects a tampered token', async () => {
    const token = await codec.seal({ userId: 'u1', email: 'a@b.com' });
    const tampered = `${token.slice(0, -2)}xx`;
    await expect(codec.unseal(tampered)).resolves.toBeNull();
  });

  it('rejects a token signed with a different secret', async () => {
    const other = createSessionCodec<Session>({ secret: 'other', ttlSeconds: 3600 });
    const token = await other.seal({ userId: 'u1', email: 'a@b.com' });
    await expect(codec.unseal(token)).resolves.toBeNull();
  });

  it('rejects an expired token', async () => {
    const expiring = createSessionCodec<Session>({ secret: 'test-secret', ttlSeconds: -1 });
    const token = await expiring.seal({ userId: 'u1', email: 'a@b.com' });
    await expect(codec.unseal(token)).resolves.toBeNull();
  });
});
