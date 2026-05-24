import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createServer } from "./server";

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Never write to stdout here — stdio transport uses it for JSON-RPC.
  process.stderr.write("monorepo-boilerplate MCP server running on stdio\n");
}

main().catch((error: unknown) => {
  process.stderr.write(`Fatal MCP server error: ${String(error)}\n`);
  process.exit(1);
});
