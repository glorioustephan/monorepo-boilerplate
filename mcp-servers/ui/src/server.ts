import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import {
  filterByRenderEnvironmentInputSchema,
  filterByRenderEnvironmentTool,
  getComponentInputSchema,
  getComponentTool,
  listByTierInputSchema,
  listByTierTool,
  listComponentsTool,
  searchComponentsInputSchema,
  searchComponentsTool,
} from './tools';

/** Build the UI-kit MCP server and register its tools. Transport-agnostic. */
export function createServer(): McpServer {
  const server = new McpServer({
    name: 'monorepo-boilerplate-ui',
    version: '0.0.0',
  });

  server.registerTool(
    'list_components',
    {
      title: 'List UI components',
      description: 'List every component in the UI kit with a short description.',
      inputSchema: {},
    },
    async () => listComponentsTool(),
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get UI component',
      description: 'Get full metadata (props, variants, usage example) for one component.',
      inputSchema: getComponentInputSchema,
    },
    async (args) => getComponentTool(args),
  );

  server.registerTool(
    'search_components',
    {
      title: 'Search UI components',
      description:
        'Hybrid search over the kit catalog — FTS5 lexical (name, category, render environment, description, variants, parts) fused with MiniLM semantic similarity. Handles both literal and conceptual queries; use this first when looking for a component to build a UI.',
      inputSchema: searchComponentsInputSchema,
    },
    async (args) => searchComponentsTool(args),
  );

  server.registerTool(
    'list_by_tier',
    {
      title: 'List components by tier',
      description:
        'List components in one taxonomy tier: Component (Radix re-export), Recipe, Block, or Template.',
      inputSchema: listByTierInputSchema,
    },
    async (args) => listByTierTool(args),
  );

  server.registerTool(
    'filter_by_render_environment',
    {
      title: 'Filter components by render environment',
      description:
        "List components by render environment: server (RSC-safe), client ('use client'), or universal.",
      inputSchema: filterByRenderEnvironmentInputSchema,
    },
    async (args) => filterByRenderEnvironmentTool(args),
  );

  return server;
}
