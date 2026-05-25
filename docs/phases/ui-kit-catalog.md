---
title: UI Kit Catalog
description: How the @monorepo-boilerplate/ui component catalog works — tiers, codegen, examples, and mcp-ui.
---

# UI-Kit Expansion — the AI-consumable component catalog

> **Superseded (re-platform).** The kit has since been rebuilt on **Radix Themes**: a
> **generated** component layer (`src/components/<category>/` from `components.manifest.ts` via
> `pnpm ui:codegen`) plus authored `recipes/`/`blocks/`/`templates/`, with color from Radix props
> and `@radix-ui/*` encapsulated inside `packages/ui` (`pnpm lint:catalog`). The **catalog itself
> now lives in `mcp-servers/ui`** — a `node:sqlite` + FTS5 database built from the kit at build
> time — so `packages/ui` ships no catalog files (no `*.catalog.ts`, no `registry.generated.ts`).
> The current source of truth is `packages/ui/AGENTS.md` + `.claude/reference/tailwind.md`. The
> historical U0–U8 design below is kept for context. Search is **hybrid** — FTS5 lexical fused
> with MiniLM (`@huggingface/transformers`) semantic similarity, with graceful fallback to
> lexical-only when the model is unavailable.

How `@monorepo-boilerplate/ui` became a tiered, machine-queryable **catalog** that
the `mcp-ui` server surfaces to agents. This is the detail behind the roadmap's
Phase 6 capstone; the track ran as phases **U0–U8**.

## What the catalog is

Every kit component is described by a typed record in
`packages/ui/src/registry.generated.ts` (`ComponentMeta`): its `tier`,
`renderEnvironment`, props, CVA `variants`, authored `intent` (`use`/`avoid`),
runnable `examples`, and the path to its live example. Agents query this through
`mcp-ui` instead of guessing component APIs.

The generated file is **committed and never hand-edited**. It is produced by
`tooling/catalog-extractor` from two inputs:

1. The component source (`*.tsx`) — the extractor infers `renderEnvironment` (from
   `"use client"`/hook imports) and CVA `variants` via ts-morph.
2. A co-located **sidecar** (`<name>.catalog.ts`) exporting `meta: CatalogSidecar` —
   the hand-authored `name`, `tier`, `description`, `props`, `examples`, `intent`.

Run `pnpm catalog:generate` to refresh; `pnpm catalog:check` fails CI if it drifts.

## Tiers

| Tier      | Location          | Rule                                                        |
| --------- | ----------------- | ----------------------------------------------------------- |
| Primitive | `src/components/` | one styled element or Radix wrapper (Button, Input, Dialog) |
| Recipe    | `src/recipes/`    | a composition for one UX pattern; client only at the leaf   |
| Block     | `src/blocks/`     | a page section; **Server Component, slot props not flags**  |
| Template  | `apps/web`        | full-page composition (app-specific; lives as an app route) |

## The example corpus ("no example ⇒ not in catalog")

Each component ships `packages/ui/examples/<slug>.example.tsx` — a plain, prop-less
default export demonstrating its variants (`<slug>` is the kebab-cased name). The
extractor **throws** if one is missing, so `catalog:check` enforces coverage in CI.
The web app renders them through an RSC harness at `/ui/<slug>`
(`apps/web/src/app/ui/[component]/page.tsx`, `dynamicParams = false` so only
catalogued slugs resolve).

## Querying it (the `mcp-ui` server)

`mcp-servers/ui` reads the generated registry (plain data — no React/CSS) and
exposes five stdio tools:

- `search_components` — zero-dependency lexical ranking over name, tier, render
  environment, description, and intent. **Use this first.**
- `list_components`, `get_component`, `list_by_tier`, `filter_by_render_environment`.

## Enforcement

`tooling/catalog-lint` runs custom ts-morph checks oxlint can't express, wired into
lefthook (staged), CI, and `.claude` PostToolUse advisory hooks:

- `lint:tokens` — bans arbitrary/raw-palette colors (semantic tokens only).
- `lint:catalog` — flags a raw `<button>`/`<input>`/`<select>` in an app where a kit
  component exists (`no-raw-html-with-catalog-equivalent`), and direct imports of
  `clsx`/`tailwind-merge`/`class-variance-authority` in apps (`require-ui-import`).

**Escape hatch:** when nothing in the catalog fits, add a catalog entry (see the
`add-ui-component` skill) or compose Radix primitives within the token contract —
never bypass the contract or copy a component's internals into an app.

## Release

`@monorepo-boilerplate/ui` is publishable via Changesets (it is not in the
`.changeset/config.json` ignore list). Because the kit is **consumed from source**
(no build step — that is deliberate, for cross-package HMR), it is distributed as
TypeScript + CSS source: consumers transpile it through their bundler exactly as the
monorepo's `apps/web` does via `transpilePackages`, and process the Tailwind source
via the `@source` directive in `styles.css`. Record changes with `pnpm changeset`;
`changeset version` bumps + writes the changelog; `pnpm changeset:publish` publishes.

## Opt-in: semantic retrieval (documented, NOT built by default)

The lexical core above ships by default and has zero native dependencies — keep it
that way for a lean install. A semantic layer is intentionally **left out** and
documented here so adopters can add it deliberately:

1. **Build-time embeddings.** A `catalog-extractor` mode emits `embeddings.json`
   alongside the registry — one vector per component, computed from
   name + description + intent using a small local model (e.g. ONNX MiniLM via
   `onnxruntime-node`). The heavy/native dependency lives **only in `tooling/`**, so
   it never reaches `packages/ui` or any app. The vectors are plain JSON (no native
   vector store), committed like the registry.
2. **Hybrid retrieval in `mcp-ui`.** `search_components` gains a path that embeds the
   query, computes **brute-force cosine** similarity in JS over the JSON vectors
   (the catalog is small — no index needed), and fuses that score with the existing
   lexical score. The transport and tool surface stay unchanged.

Both steps are additive and gated behind an explicit opt-in; the default catalog
remains lexical-only and dependency-light.
