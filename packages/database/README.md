# @monorepo-boilerplate/database

Drizzle ORM data layer (PostgreSQL).

```
src/
  schema/     table definitions (drizzle pg-core)
  queries/    reusable, typed query functions (take a Database arg)
  client.ts   pooled Drizzle client; getDatabase() reads DATABASE_URL lazily
  migrate.ts  applies migrations
  seed.ts     idempotent seed
migrations/   generated SQL + metadata (drizzle-kit generate)
```

## Local workflow

```bash
docker compose up -d                                   # start postgres
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/app
pnpm --filter @monorepo-boilerplate/database db:generate   # SQL from schema changes
pnpm --filter @monorepo-boilerplate/database db:migrate    # apply migrations
pnpm --filter @monorepo-boilerplate/database db:seed       # optional seed data
pnpm --filter @monorepo-boilerplate/database db:studio     # browse data
```

`db:generate` works offline; `db:migrate`/`db:seed`/`db:studio` need a running database
(hence they are not part of CI). The client is created lazily, so typechecks and builds
never require a database connection.

## Usage

```ts
import { getDatabase, getUserByEmail } from "@monorepo-boilerplate/database";

const db = getDatabase();
const user = await getUserByEmail(db, "demo@example.com");
```
