# MCP server (example) — `@monorepo-boilerplate/mcp-example`

A Model Context Protocol server over **stdio**, built with `@modelcontextprotocol/sdk`.
Bundled with **tsdown** to `dist/index.mjs` (tsdown inlines internal `@monorepo-boilerplate/*`
packages via `noExternal`, so the standalone Node process has no `.ts` runtime imports).

## Rules

- **Never write to stdout** (`console.log`) — stdio is the JSON-RPC channel. Log to **stderr**
  (`process.stderr.write`) only.
- Keep tool logic as **pure handlers** in `src/tools/` (see `greet.ts`): a zod `inputSchema`
  raw shape + a function returning a `CallToolResult`. This keeps tools unit-testable without a transport.
- Register tools in `src/server.ts` via `server.registerTool(name, { title, description, inputSchema }, handler)`.
  `src/index.ts` is just the stdio wiring — keep it thin.
- `dev`: `tsx watch src/index.ts`. `build`: `tsdown`. `start`: `node dist/index.mjs`.
- Test handlers directly with Vitest (`*.test.ts`, `nodePreset`). For an end-to-end check,
  connect with the MCP Inspector: `npx @modelcontextprotocol/inspector node dist/index.mjs`.
