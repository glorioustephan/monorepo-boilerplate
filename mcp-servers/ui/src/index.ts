#!/usr/bin/env -S node --experimental-sqlite
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createLogger } from '@monorepo-boilerplate/logger';

import { loadCatalog } from './catalog/load';
import { createServer } from './server';

const log = createLogger('mcp-ui');

// `catalog.db` sits at the package root. Both src/index.ts and the bundled dist/index.mjs live one
// level under it, so this resolves correctly in dev and after tsdown bundling.
const DB_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '../catalog.db');

async function main(): Promise<void> {
  const catalog = loadCatalog(DB_PATH);
  const server = createServer(catalog);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log.info('UI-kit MCP server running on stdio');

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      catalog.close();
      process.exit(0);
    });
  }
}

main().catch((error: unknown) => {
  log.error('Fatal UI MCP server error', { error: String(error) });
  process.exit(1);
});
