# UI-kit MCP server — `@monorepo-boilerplate/ui-mcp-server`

A Model Context Protocol server (stdio) that exposes the UI kit's component
**registry** so agents can discover components while building UIs. Bundled with
tsdown like the other MCP server.

## Rules

- Reads `@monorepo-boilerplate/ui/registry` (plain data — no React/CSS). Don't import UI
  components or CSS here; only the registry.
- Tools live as pure functions in `src/tools.ts` (testable without a transport); `src/server.ts`
  registers them; `src/index.ts` is the stdio wiring.
- **Never write to stdout** — log to stderr via `@monorepo-boilerplate/logger`.
- When the kit gains a component, update `packages/ui/src/registry.ts`; this server surfaces it
  automatically. Add new tools (e.g. theme listing) as the kit matures (roadmap Phase 6).
- Inspect with: `npx @modelcontextprotocol/inspector node dist/index.mjs` (after `pnpm build`).
