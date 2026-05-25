import { existsSync } from 'node:fs';

import { type Catalog, openCatalog } from './db';

/** Open the catalog at `dbPath`, throwing a clear, actionable error if it hasn't been built. */
export function loadCatalog(dbPath: string): Catalog {
  if (!existsSync(dbPath)) {
    throw new Error(
      `Catalog DB not found at ${dbPath} — run \`pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog\`.`,
    );
  }
  return openCatalog(dbPath);
}
