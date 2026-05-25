import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { type Catalog, openCatalog } from './catalog/db';
import { embed } from './catalog/embed';
import { RENDER_ENVS, TIERS } from './catalog/schema';

// catalog.db lives at the package root; both `dist/index.mjs` and `src/index.ts` are
// one level below it. Opened lazily so the module imports even if the DB is absent.
const DB_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '../catalog.db');

let catalogSingleton: Catalog | undefined;
function catalog(): Catalog {
  if (!catalogSingleton) {
    if (!existsSync(DB_PATH)) {
      throw new Error(
        `Catalog DB not found at ${DB_PATH} — run \`pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog\`.`,
      );
    }
    catalogSingleton = openCatalog(DB_PATH);
  }
  return catalogSingleton;
}

function json(data: unknown): CallToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
}

/** `list_components` — names + descriptions of every catalogued component. */
export function listComponentsTool(): CallToolResult {
  return json(catalog().list());
}

export const getComponentInputSchema = {
  name: z.string().min(1).describe('Component name, e.g. Button'),
};

/** `get_component` — full metadata (variants, parts, example) for one component. */
export function getComponentTool({ name }: { name: string }): CallToolResult {
  const record = catalog().get(name);
  if (!record) {
    return { content: [{ type: 'text', text: `Unknown component: ${name}` }], isError: true };
  }
  return json(record);
}

export const searchComponentsInputSchema = {
  query: z
    .string()
    .min(1)
    .describe("Free-text query, e.g. 'modal confirm dialog' or 'server-safe form input'"),
};

/** `search_components` — hybrid ranking: FTS5 lexical fused with MiniLM cosine (falls back to
 *  lexical-only if the embedding model is unavailable). */
export async function searchComponentsTool({ query }: { query: string }): Promise<CallToolResult> {
  const queryVec = await embed(query);
  return json(catalog().search(query, queryVec));
}

const tierSchema = z.enum(TIERS);

export const listByTierInputSchema = {
  tier: tierSchema.describe('Catalog tier to list'),
};

/** `list_by_tier` — every component in one taxonomy tier. */
export function listByTierTool({ tier }: { tier: z.infer<typeof tierSchema> }): CallToolResult {
  return json(catalog().listByTier(tier));
}

const renderEnvironmentSchema = z.enum(RENDER_ENVS);

export const filterByRenderEnvironmentInputSchema = {
  renderEnvironment: renderEnvironmentSchema.describe(
    "server (RSC-safe), client ('use client'), or universal",
  ),
};

/** `filter_by_render_environment` — components that render in the given environment. */
export function filterByRenderEnvironmentTool({
  renderEnvironment,
}: {
  renderEnvironment: z.infer<typeof renderEnvironmentSchema>;
}): CallToolResult {
  return json(catalog().filterByRenderEnv(renderEnvironment));
}
