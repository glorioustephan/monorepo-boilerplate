import { createEnv } from "@monorepo-boilerplate/environment";
import { z } from "zod";

/**
 * Typed, validated environment for the web app. Add server-only vars under
 * `server` and browser-exposed vars (prefixed `NEXT_PUBLIC_`) under `client`.
 * Importing `env` anywhere validates the environment at module load.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    SESSION_SECRET: z.string().min(16).default("dev-insecure-session-secret-change-me"),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1).default("monorepo-boilerplate"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
  emptyStringAsUndefined: true,
});
