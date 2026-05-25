# UI-kit MCP server — `@monorepo-boilerplate/mcp-ui`

A Model Context Protocol server (stdio) that **owns the UI component catalog** so agents
can discover components while building UIs. It scrapes the kit at build time into its own
`node:sqlite` database and serves search/retrieval at runtime. Bundled with tsdown.

## How the catalog works

- **Build time** (`scripts/build-catalog.ts`, run by `pnpm build` before tsdown): reads the
  kit's atom manifest (`@monorepo-boilerplate/ui/primitives/atoms.manifest`) — and the
  generated reference stories as verbatim examples — into catalog records, then writes
  `catalog.db` (a `node:sqlite` DB: a `components` table, an FTS5 `components_fts` index, and a
  reserved `vectors` table for the future semantic layer). `catalog.db` is gitignored.
- **Runtime** (`src/catalog/db.ts`): opens `catalog.db` read-only and serves queries. Lexical
  search is FTS5/bm25. `packages/ui` carries **no** catalog files — the kit is just a UI kit.
- **node:sqlite** requires Node ≥22.5 with `--experimental-sqlite`; the server bin's shebang
  sets it, and the npm scripts use `NODE_OPTIONS=--experimental-sqlite`. If you invoke
  `node dist/index.mjs` directly, pass `--experimental-sqlite` (or set `NODE_OPTIONS`).

## Tools

| Tool                           | Input                                         | Returns                                         |
| ------------------------------ | --------------------------------------------- | ----------------------------------------------- |
| `search_components`            | `query` (free text)                           | FTS5/bm25-ranked components (use this first)    |
| `list_components`              | —                                             | every component (name, tier, description)       |
| `get_component`                | `name`                                        | full record (variants, parts, verbatim example) |
| `list_by_tier`                 | `tier` (Atom/Primitive/Recipe/Block/Template) | components in that tier                         |
| `filter_by_render_environment` | `renderEnvironment` (server/client/universal) | components for that environment                 |

## Rules

- Tools are pure functions in `src/tools.ts` over `src/catalog/db.ts` (the catalog is opened
  lazily as a singleton from `../catalog.db`). `src/server.ts` registers them; `src/index.ts` is
  the stdio wiring (carries the `--experimental-sqlite` shebang).
- **Never write to stdout** — that's the JSON-RPC channel; log to stderr via
  `@monorepo-boilerplate/logger`. (The `--experimental-sqlite` warning goes to stderr — harmless.)
- The catalog schema lives here (`src/catalog/schema.ts`), not in the kit. When the kit gains a
  component, `pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog` refreshes the DB.
- **Planned (not yet built):** MiniLM embeddings computed at build time into the `vectors` table,
  with runtime hybrid retrieval (FTS5 lexical fused with brute-force cosine). See the TODO in
  `scripts/build-catalog.ts`.
- Inspect with: `npx @modelcontextprotocol/inspector node --experimental-sqlite dist/index.mjs`
  (after `pnpm build`).
