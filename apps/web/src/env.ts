import { createEnv } from '@monorepo-boilerplate/environment';

import { clientSchema, serverSchema } from './env.schema';

/**
 * Typed, validated environment for the web app. The schema lives in
 * `env.schema.ts` (shared with `scripts/env-doctor.ts`); add new vars there.
 * Importing `env` anywhere validates the environment at module load.
 */
export const env = createEnv({
  server: serverSchema,
  client: clientSchema,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SESSION_SECRET: process.env.SESSION_SECRET,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
  emptyStringAsUndefined: true,
});
