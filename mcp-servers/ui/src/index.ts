import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createLogger } from "@monorepo-boilerplate/logger";

import { createServer } from "./server";

const log = createLogger("mcp-ui");

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log.info("UI-kit MCP server running on stdio");
}

main().catch((error: unknown) => {
  log.error("Fatal UI MCP server error", { error: String(error) });
  process.exit(1);
});
