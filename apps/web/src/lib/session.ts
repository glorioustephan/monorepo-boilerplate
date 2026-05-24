import { createSessionCodec } from "@monorepo-boilerplate/auth";

import { env } from "@/env";

// Codec + cookie name only. Deliberately free of `next/headers` so this module
// is safe to import from the proxy (Next 16's renamed middleware), which can't use `next/headers`.
export const SESSION_COOKIE = "session";

export interface SessionData extends Record<string, unknown> {
  userId: string;
  email: string;
}

export const sessionCodec = createSessionCodec<SessionData>({
  secret: env.SESSION_SECRET,
  ttlSeconds: 60 * 60 * 24 * 7,
});
