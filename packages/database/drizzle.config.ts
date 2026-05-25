import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './migrations',
  dbCredentials: {
    // Only used by `migrate`/`studio`/`push`; `generate` works offline.
    url: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/app',
  },
});
