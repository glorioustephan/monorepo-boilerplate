# Environment — `@monorepo-boilerplate/environment`

Typed env validation (t3-env + zod) plus a non-throwing `env:doctor` helper.

## Rules

- This package exposes **utilities, not values**: `createEnv` (re-export from t3-env) and
  `checkEnv` / `printDoctorReport`. Apps own their actual schema in their `src/env.ts`.
- To add a variable in an app: add it to the app's shared schema (e.g. `apps/web/src/env.schema.ts`,
  `server` for secrets / `client` for `NEXT_PUBLIC_*`). Both `createEnv` (in `env.ts`) and the
  `env:doctor` script import that one map, so there's nothing to mirror.
- `createEnv` **throws** on the first invalid var (fail-fast at startup). `checkEnv` validates
  every var and returns a per-variable report — that's what powers `pnpm env:doctor`.
- Node-only package (uses `process.env`); don't import it into client component code paths.
