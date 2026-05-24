import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createLogger } from "@monorepo-boilerplate/logger";

import { createServer } from "./server";

// Logger writes to stderr, keeping stdout clean for the JSON-RPC channel.
const log = createLogger("mcp-server");

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log.info("MCP server running on stdio");
}

main().catch((error: unknown) => {
  log.error("Fatal MCP server error", { error: String(error) });
  process.exit(1);
});
