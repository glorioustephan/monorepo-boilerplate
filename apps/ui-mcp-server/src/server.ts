import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { getComponentInputSchema, getComponentTool, listComponentsTool } from "./tools";

/** Build the UI-kit MCP server and register its tools. Transport-agnostic. */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "monorepo-boilerplate-ui",
    version: "0.0.0",
  });

  server.registerTool(
    "list_components",
    {
      title: "List UI components",
      description: "List every component in the UI kit with a short description.",
      inputSchema: {},
    },
    async () => listComponentsTool(),
  );

  server.registerTool(
    "get_component",
    {
      title: "Get UI component",
      description: "Get full metadata (props, variants, usage example) for one component.",
      inputSchema: getComponentInputSchema,
    },
    async (args) => getComponentTool(args),
  );

  return server;
}
