import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { Catalog } from './catalog/db';
import {
  componentsOutputSchema,
  createTools,
  filterByRenderEnvironmentInputSchema,
  getComponentInputSchema,
  getComponentOutputSchema,
  listByTierInputSchema,
  searchComponentsInputSchema,
  summariesOutputSchema,
} from './tools';

// Every tool is a pure read over the catalog: safe to call without confirmation or to parallelize.
const READ_ONLY = { readOnlyHint: true, idempotentHint: true, openWorldHint: false } as const;

/** Build the UI-kit MCP server over a catalog and register its tools. Transport-agnostic. */
export function createServer(catalog: Catalog): McpServer {
  const server = new McpServer({ name: 'monorepo-boilerplate-ui', version: '0.0.0' });
  const tools = createTools(catalog);

  server.registerTool(
    'search_components',
    {
      title: 'Search UI components',
      description:
        'Hybrid search over the kit catalog — FTS5 lexical (name, category, render environment, description, variants, parts) fused with MiniLM semantic similarity. Handles both literal and conceptual queries; use this first when looking for a component to build a UI.',
      inputSchema: searchComponentsInputSchema,
      outputSchema: componentsOutputSchema,
      annotations: READ_ONLY,
    },
    async (args) => tools.searchComponents(args),
  );

  server.registerTool(
    'list_components',
    {
      title: 'List UI components',
      description: 'List every component in the UI kit with its tier and a short description.',
      inputSchema: {},
      outputSchema: summariesOutputSchema,
      annotations: READ_ONLY,
    },
    () => tools.listComponents(),
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get UI component',
      description:
        'Get full metadata (variants, compound parts, runnable example) for one component.',
      inputSchema: getComponentInputSchema,
      outputSchema: getComponentOutputSchema,
      annotations: READ_ONLY,
    },
    (args) => tools.getComponent(args),
  );

  server.registerTool(
    'list_by_tier',
    {
      title: 'List components by tier',
      description:
        'List components in one taxonomy tier: Component (Radix re-export), Recipe, Block, or Template.',
      inputSchema: listByTierInputSchema,
      outputSchema: componentsOutputSchema,
      annotations: READ_ONLY,
    },
    (args) => tools.listByTier(args),
  );

  server.registerTool(
    'filter_by_render_environment',
    {
      title: 'Filter components by render environment',
      description:
        "List components by render environment: server (RSC-safe), client ('use client'), or universal.",
      inputSchema: filterByRenderEnvironmentInputSchema,
      outputSchema: componentsOutputSchema,
      annotations: READ_ONLY,
    },
    (args) => tools.filterByRenderEnvironment(args),
  );

  return server;
}
