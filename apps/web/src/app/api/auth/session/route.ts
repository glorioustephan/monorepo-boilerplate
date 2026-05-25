import { cookies } from 'next/headers';

import { env } from '@/env';
import { SESSION_COOKIE, sessionCodec } from '@/lib/session';

// Demo login/logout. In a real app, POST would first authenticate credentials
// (or an OAuth callback) and only then seal the resulting identity.
export async function POST(): Promise<Response> {
  const token = await sessionCodec.seal({ userId: 'demo', email: 'demo@example.com' });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true });
}

export async function DELETE(): Promise<Response> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
