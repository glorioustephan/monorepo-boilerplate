import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import type { Catalog } from './catalog/db';
import { embed } from './catalog/embed';
import {
  componentRecordSchema,
  componentSummarySchema,
  RENDER_ENVS,
  TIERS,
} from './catalog/schema';

// --- Input schemas (ZodRawShape per tool) ---
export const getComponentInputSchema = {
  name: z.string().min(1).describe('Component name, e.g. Button'),
};
export const searchComponentsInputSchema = {
  query: z
    .string()
    .min(1)
    .describe("Free-text query, e.g. 'modal confirm dialog' or 'server-safe form input'"),
};
const tierSchema = z.enum(TIERS);
export const listByTierInputSchema = { tier: tierSchema.describe('Catalog tier to list') };
const renderEnvironmentSchema = z.enum(RENDER_ENVS);
export const filterByRenderEnvironmentInputSchema = {
  renderEnvironment: renderEnvironmentSchema.describe(
    "server (RSC-safe), client ('use client'), or universal",
  ),
};

// --- Output schemas (so clients get typed `structuredContent`, validated by the SDK) ---
export const componentsOutputSchema = { components: z.array(componentRecordSchema) };
export const summariesOutputSchema = { components: z.array(componentSummarySchema) };
export const getComponentOutputSchema = componentRecordSchema.shape;

/** A tool result carrying both human-readable text and machine-readable structured content. */
function dual(structuredContent: Record<string, unknown>): CallToolResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(structuredContent, null, 2) }],
    structuredContent,
  };
}

export interface UiTools {
  listComponents(): CallToolResult;
  getComponent(args: { name: string }): CallToolResult;
  searchComponents(args: { query: string }): Promise<CallToolResult>;
  listByTier(args: { tier: z.infer<typeof tierSchema> }): CallToolResult;
  filterByRenderEnvironment(args: {
    renderEnvironment: z.infer<typeof renderEnvironmentSchema>;
  }): CallToolResult;
}

/** Build the tool implementations over a catalog. Pure — inject any `Catalog` (incl. a test one). */
export function createTools(catalog: Catalog): UiTools {
  return {
    listComponents() {
      return dual({ components: catalog.list() });
    },
    getComponent({ name }) {
      const record = catalog.get(name);
      if (!record) {
        return { content: [{ type: 'text', text: `Unknown component: ${name}` }], isError: true };
      }
      return dual({ ...record });
    },
    async searchComponents({ query }) {
      const queryVec = await embed(query);
      return dual({ components: catalog.search(query, queryVec) });
    },
    listByTier({ tier }) {
      return dual({ components: catalog.listByTier(tier) });
    },
    filterByRenderEnvironment({ renderEnvironment }) {
      return dual({ components: catalog.filterByRenderEnv(renderEnvironment) });
    },
  };
}
