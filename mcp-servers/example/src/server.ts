import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { greet, greetInputSchema } from './tools/greet';

/** Build the MCP server and register its tools. Transport-agnostic. */
export function createServer(): McpServer {
  const server = new McpServer({
    name: 'monorepo-boilerplate-mcp',
    version: '0.0.0',
  });

  server.registerTool(
    'greet',
    {
      title: 'Greet',
      description: 'Greet someone by name.',
      inputSchema: greetInputSchema,
    },
    async (args) => greet(args),
  );

  return server;
}
