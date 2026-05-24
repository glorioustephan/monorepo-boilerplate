# Database — `@monorepo-boilerplate/database`

Drizzle ORM + PostgreSQL. See `README.md` for the local workflow.

## Rules

- **Schema** lives in `src/schema/*.ts` (drizzle `pg-core`); export inferred types
  (`$inferSelect` / `$inferInsert`). Re-export from `src/schema/index.ts`.
- **Queries** are plain functions in `src/queries/*.ts` that take a `Database` argument —
  never reach for a global. This keeps them testable and explicit.
- **Never connect at import time.** `getDatabase()` validates `DATABASE_URL` and builds the
  pool lazily, so typechecks/builds/CI work without a database. New entrypoints must keep that property.
- **Changing schema?** Edit the table, then run `db:generate` to produce a migration. Commit
  the generated SQL in `migrations/`. Don't hand-edit generated migrations.
- Throw `AppError` (from `@monorepo-boilerplate/types`) for expected failures.
- Secrets come from validated env, not hard-coded connection strings.
