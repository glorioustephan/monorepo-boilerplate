import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { z } from 'zod';

import * as schema from './schema';

const connectionStringSchema = z.string().url();

export type Database = ReturnType<typeof createDatabase>;

/** Create a Drizzle client over a postgres connection pool. */
export function createDatabase(connectionString: string, options: { max?: number } = {}) {
  const client = postgres(connectionString, { max: options.max ?? 10 });
  return drizzle(client, { schema });
}

let cached: Database | undefined;

/**
 * Lazily-created singleton client, read from `DATABASE_URL`. Validation happens
 * on first call (not at import) so typechecks/builds don't require a database.
 */
export function getDatabase(): Database {
  if (!cached) {
    const url = connectionStringSchema.parse(process.env.DATABASE_URL);
    cached = createDatabase(url);
  }
  return cached;
}
