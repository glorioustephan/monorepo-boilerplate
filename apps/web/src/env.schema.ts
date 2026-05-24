import { z } from "zod";

/**
 * Single source of truth for the web app's env schema. Both `src/env.ts`
 * (fail-fast validation via t3-env) and `scripts/env-doctor.ts` (non-throwing
 * report) consume these maps, so they can never drift. This module imports only
 * zod — it does NOT call `createEnv`, so importing it never validates/throws.
 */

export const serverSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SESSION_SECRET: z.string().min(16).default("dev-insecure-session-secret-change-me"),
  // Optional so a fresh fork builds/dev-runs without it. The webhook route fails
  // CLOSED (rejects requests) when it is unset — see route.ts.
  WEBHOOK_SECRET: z.string().min(16).optional(),
} as const;

export const clientSchema = {
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("monorepo-boilerplate"),
} as const;
