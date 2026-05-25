# UI-kit MCP server — `@monorepo-boilerplate/mcp-ui`

A Model Context Protocol server (stdio) that **owns the UI component catalog** so agents
can discover components while building UIs. It scrapes the kit at build time into its own
`node:sqlite` database and serves search/retrieval at runtime. Bundled with tsdown.

## How the catalog works

- **Build time** (`scripts/build-catalog.ts`, run by `pnpm build` before tsdown): reads the kit's
  component manifest (`@monorepo-boilerplate/ui/components/components.manifest`) + the authored
  recipes/blocks/templates (JSDoc descriptions) + the reference stories/examples as verbatim
  examples → catalog records; embeds each with **MiniLM** (`@huggingface/transformers`); then writes
  `catalog.db` (a `node:sqlite` DB: a `components` table, an FTS5 `components_fts` index, and a
  `vectors` table of embeddings). `catalog.db` is gitignored. If the model is unavailable the
  vectors stay empty and the catalog degrades to lexical-only.
- **Runtime** (`src/catalog/db.ts`): opens `catalog.db` read-only, loads records + vectors into
  memory, and serves **hybrid search** — FTS5/bm25 fused with brute-force cosine over the MiniLM
  vectors (the query is embedded lazily at search time, falling back to lexical if the model can't
  load). `packages/ui` carries **no** catalog files — the kit is just a UI kit.
- **node:sqlite** requires Node ≥22.5 with `--experimental-sqlite`; the server bin's shebang
  sets it, and the npm scripts use `NODE_OPTIONS=--experimental-sqlite`. If you invoke
  `node dist/index.mjs` directly, pass `--experimental-sqlite` (or set `NODE_OPTIONS`).

## Tools

Every tool is a read-only catalog query (declared `readOnlyHint`/`idempotentHint`, `openWorldHint:
false`) and returns **both** human-readable text **and** typed `structuredContent` validated against
the tool's `outputSchema` — so MCP clients can consume results either way.

| Tool                           | Input                                         | Returns                                              |
| ------------------------------ | --------------------------------------------- | ---------------------------------------------------- |
| `search_components`            | `query` (free text)                           | hybrid (FTS5 + MiniLM) ranked components (use first) |
| `list_components`              | —                                             | every component (name, tier, description)            |
| `get_component`                | `name`                                        | full record (variants, parts, verbatim example)      |
| `list_by_tier`                 | `tier` (Component/Recipe/Block/Template)      | components in that tier                              |
| `filter_by_render_environment` | `renderEnvironment` (server/client/universal) | components for that environment                      |

## Rules

- **Wiring** is dependency-injected, not singletons: `src/index.ts` resolves the DB path
  (`../catalog.db`, depth-stable across `src` and the bundled `dist`), calls `loadCatalog`
  (`src/catalog/load.ts` — throws an actionable error if the DB hasn't been built), then
  `createServer(catalog)` (`src/server.ts`) which registers the tools built by `createTools(catalog)`
  (`src/tools.ts`). `index.ts` also carries the `--experimental-sqlite` shebang and closes the
  catalog on `SIGINT`/`SIGTERM`. Because the tools take an injected `Catalog`, they're unit-tested
  with an in-memory fake (`src/tools.test.ts`).
- **Never write to stdout** — that's the JSON-RPC channel; log to stderr via
  `@monorepo-boilerplate/logger`. (The `--experimental-sqlite` warning goes to stderr — harmless.)
- The catalog schema lives here (`src/catalog/schema.ts`), not in the kit. When the kit gains a
  component, `pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog` refreshes the DB.
- **Embeddings** (`src/catalog/embed.ts`): MiniLM via `@huggingface/transformers`, loaded by
  **dynamic import** (lazy, with graceful fallback) and used at both build time (record vectors)
  and runtime (query vector). `onnxruntime-node` is allowed to run its install script
  (`pnpm-workspace.yaml` `allowBuilds`). Semantic recall is bounded by description quality — keep
  component `usage`/JSDoc descriptive.
- **Tests** (`pnpm --filter @monorepo-boilerplate/mcp-ui test`): `catalog/db.test.ts` covers
  build→open round-trips, lexical/hybrid ranking, and corruption; `catalog/scrape.test.ts` covers
  the pure scrape helpers (`src/catalog/scrape.ts`, shared with `build-catalog`); `tools.test.ts`
  exercises the tools over an injected fake catalog; `catalog/embed.test.ts` mocks the model to
  verify the dimension guard and graceful fallback. No network/model download in unit tests.
- Inspect with: `npx @modelcontextprotocol/inspector node --experimental-sqlite dist/index.mjs`
  (after `pnpm build`).
