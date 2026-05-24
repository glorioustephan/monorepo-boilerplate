# UI-kit MCP server — `@monorepo-boilerplate/mcp-ui`

A Model Context Protocol server (stdio) that exposes the UI kit's generated
component **catalog** so agents can discover components while building UIs.
Bundled with tsdown like the other MCP server.

## Tools

All read the generated catalog (`@monorepo-boilerplate/ui/registry`); querying is
in-memory and zero-dependency.

| Tool                           | Input                                         | Returns                                             |
| ------------------------------ | --------------------------------------------- | --------------------------------------------------- |
| `search_components`            | `query` (free text)                           | components ranked by lexical score (use this first) |
| `list_components`              | —                                             | every component (name, description, tier)           |
| `get_component`                | `name`                                        | full metadata (props, variants, examples, intent)   |
| `list_by_tier`                 | `tier` (Primitive/Recipe/Block/Template)      | components in that tier                             |
| `filter_by_render_environment` | `renderEnvironment` (server/client/universal) | components for that environment                     |

`search_components` scores each component over name (highest), tier, render
environment, description, and authored intent; only positive scores are returned,
ordered by score. Semantic/embedding retrieval is **not** built in (documented as
an opt-in layer in `roadmap.md`).

## Rules

- Reads `@monorepo-boilerplate/ui/registry` (plain data — no React/CSS). Don't import UI
  components or CSS here; only the registry.
- Tools live as pure functions in `src/tools.ts` (testable without a transport); `src/server.ts`
  registers them; `src/index.ts` is the stdio wiring.
- **Never write to stdout** — log to stderr via `@monorepo-boilerplate/logger`.
- The kit gains a component via its `*.catalog.ts` sidecar + `pnpm catalog:generate`; this server
  surfaces it automatically (no change here). Add new tools as the catalog grows new facets.
- Inspect with: `npx @modelcontextprotocol/inspector node dist/index.mjs` (after `pnpm build`).
