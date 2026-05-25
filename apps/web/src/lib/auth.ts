import { cookies } from 'next/headers';

import { SESSION_COOKIE, sessionCodec, type SessionData } from './session';

export type { SessionData };
export { SESSION_COOKIE, sessionCodec };

/**
 * Read and verify the current session in a Server Component, Server Action, or
 * Route Handler. Returns `null` when there is no valid session.
 */
export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? sessionCodec.unseal(token) : null;
}
