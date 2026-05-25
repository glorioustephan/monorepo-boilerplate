---
title: UI Kit Catalog
description: How the @monorepo-boilerplate/ui kit and the mcp-ui catalog work — tiers, codegen, hybrid search, and enforcement.
---

# The UI kit and its AI-consumable catalog

`@monorepo-boilerplate/ui` is the single, enforced UI vocabulary, built on **Radix Themes**. The
**`mcp-ui` MCP server owns the catalog**: it scrapes the kit at build time into its own
`node:sqlite` database and serves search/retrieval to agents at runtime. The kit ships **no**
catalog files — it is just a UI kit. The canonical, code-adjacent source of truth is
`packages/ui/AGENTS.md` and `mcp-servers/ui/AGENTS.md`; this page is the narrative companion.

## Tiers and categories

Two orthogonal axes describe every component:

- **Tier** = origin / abstraction (the folder it lives in).
- **Category** = function — Layout, Typography, Forms, Data Display, Overlays, Navigation — which
  drives the `components/<category>/` sub-folder, the Storybook nav, and a catalog facet.

| Tier          | Location                | What it is                                                             |
| ------------- | ----------------------- | ---------------------------------------------------------------------- |
| **Component** | `src/components/<cat>/` | a thin re-export of a Radix Themes component, **generated**            |
| **Recipe**    | `src/recipes/`          | a small composition for one UX pattern (e.g. `ConfirmDialog`, `Field`) |
| **Block**     | `src/blocks/`           | a page section (`Hero`, `Cta`, `FeatureGrid`)                          |
| **Template**  | `src/templates/`        | a full-page composition built from blocks                              |

## The generated Component layer

`src/components/components.manifest.ts` is the **single source of truth** for the re-export layer:
one entry per Radix Themes atom (`name`, `category`, `renderEnv`, `usage`, variant `axes`, and
`compound`/`parts` for namespace components like `Dialog`). `pnpm ui:codegen`
(`tooling/catalog-codegen`) reads it and emits, per entry:

- `<Name>.tsx` — the thin re-export, with a generated-file banner and JSDoc from `usage`.
- `<Name>.stories.tsx` — a **variant-matrix** reference story, for non-compound atoms only.

Compound components (Dialog, Tabs, Select, Table, …) get a value-only re-export and a
**hand-authored** story showing a real composition; the codegen's banner-safe prune deletes only
files it generated, so hand-authored stories survive. `pnpm ui:codegen:check` regenerates and fails
CI on drift. **Never edit generated files** — edit the manifest and regenerate.

## The catalog (`mcp-servers/ui`)

**Build time** (`scripts/build-catalog.ts`, run by `pnpm build` before tsdown): reads the manifest +
the authored recipes/blocks/templates (JSDoc descriptions) + the reference stories/examples **read
verbatim** as usage examples → catalog records (`src/catalog/schema.ts`, validated with Zod). Each
record is embedded with **MiniLM** (`@huggingface/transformers`, loaded by lazy dynamic import).
The result is written to `catalog.db` — a `node:sqlite` database with a `components` table, an FTS5
`components_fts` index, and a `vectors` table of embeddings. `catalog.db` is gitignored; if the
model is unavailable at build time the vectors stay empty and the catalog degrades to lexical-only.

**Runtime** (`src/catalog/db.ts`): opens `catalog.db` read-only, loads records + vectors into memory,
and serves **hybrid search** — FTS5/bm25 (name column weighted, stopwords dropped) fused with
brute-force cosine over the MiniLM vectors. The query is embedded lazily at search time; if the model
can't load, search falls back to pure lexical ranking. `node:sqlite` requires Node ≥22.5 with
`--experimental-sqlite` (set by the server bin's shebang and the npm scripts).

The pure scrape helpers live in `src/catalog/scrape.ts` (shared with the build script) and the whole
pipeline is unit-tested — build→open round-trips, lexical/hybrid ranking, the embedding dimension
guard, and the tools over an injected fake catalog.

## Querying it (the tools)

`mcp-servers/ui` exposes five stdio tools. Each is a **read-only** query (declared via
`readOnlyHint`/`idempotentHint`, `openWorldHint: false`) and returns **both** human-readable text and
typed `structuredContent` validated against the tool's `outputSchema`:

- `search_components` — hybrid (FTS5 + MiniLM) ranked results. **Use this first.**
- `list_components`, `get_component`, `list_by_tier`, `filter_by_render_environment`.

Inspect with `npx @modelcontextprotocol/inspector node --experimental-sqlite dist/index.mjs` after
`pnpm build`.

## Enforcement

`tooling/catalog-lint` runs custom ts-morph checks oxlint can't express, wired into lefthook
(staged), CI, and `.claude` PostToolUse advisory hooks:

- `lint:tokens` — bans arbitrary/raw-palette colors; color must come from Radix props + the theme.
- `lint:catalog` — the linchpin **Radix-encapsulation** rule: importing `@radix-ui/*` anywhere
  outside `packages/ui` is a hard error, plus a raw-`<button>`/`<input>`/`<select>`-where-a-kit-
  component-exists check. Encapsulation is real only because it's enforced, not merely documented.

**Escape hatch:** when nothing in the kit fits, add a manifest entry (then `pnpm ui:codegen`) or
hand-build a recipe/block/template composing the kit's components — never import Radix directly in an
app or copy a component's internals.

## Release

`@monorepo-boilerplate/ui` is publishable via Changesets. Because the kit is **consumed from source**
(no build step — deliberate, for cross-package HMR), it is distributed as TypeScript + CSS source:
consumers transpile it through their bundler (as `apps/web` does via `transpilePackages`) and process
the Tailwind source via the `@source` directive in `styles.css`. Record changes with `pnpm
changeset`; `changeset version` bumps + writes the changelog; `pnpm changeset:publish` publishes.
