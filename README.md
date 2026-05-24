# @monorepo-boilerplate

An opinionated **Turborepo + pnpm** monorepo template, built to be forked as the
starting point for new projects. It ships a working Next.js 16 + React 19 web app,
a Model Context Protocol (MCP) server, a Tailwind v4 UI kit, and a cohesive
**cross-agent convention layer** so both humans and AI coding agents stay consistent.

> Status: **Phases 0–6 complete** (see [`roadmap.md`](./roadmap.md)) — foundation, hardening,
> data layer, providers, auth, deployment, and a UI kit with its own MCP server. The kit has
> since grown into a tiered, AI-consumable **component catalog** (UI-Kit Expansion track U0–U8;
> see [`docs/phases/ui-kit-catalog.md`](./docs/phases/ui-kit-catalog.md)). This is a living
> boilerplate; keep iterating holistically.

## Why this exists

Spinning up a new monorepo means re-deciding the same things every time: workspace
layout, TypeScript config, linting/formatting, testing, CI, versioning, and the
conventions that keep a growing codebase coherent. This template makes those
decisions once — with current (2026) tooling — and encodes them so they're
discoverable by people and agents alike.

## Stack

| Area          | Choice                                                                |
| ------------- | --------------------------------------------------------------------- |
| Monorepo      | Turborepo 2 + pnpm workspaces (with **catalogs** for version pinning) |
| Web           | Next.js 16 (App Router, Turbopack, React Compiler)                    |
| UI            | React 19 + Tailwind v4 kit, consumed from source for HMR              |
| MCP           | `@modelcontextprotocol/sdk` over stdio                                |
| Language      | TypeScript (strict)                                                   |
| Lint / format | **oxlint + oxfmt** (Rust, fast)                                       |
| Env           | `@t3-oss/env-nextjs` + zod, with an `env:doctor`                      |
| Testing       | Vitest (unit) + Playwright (e2e)                                      |
| Versioning    | Changesets                                                            |
| Git hooks     | lefthook                                                              |

## Layout

```
apps/             user-facing deliverables
  web/            Next.js 16 + React 19 (UI kit, auth proxy, webhook route)
mcp-servers/      internal MCP servers (agent/dev tooling)
  example/        MCP server (stdio) with a `greet` tool
  ui/             MCP server exposing the UI kit's component catalog (search/list/get)
services/         reserved for future backend services (README only)
tooling/          config-only + build-time tooling (ship nothing)
  ts-config/      TypeScript presets
  oxc-config/     oxlint presets + oxfmt config
  test-config/    Vitest + Playwright presets
packages/         real libraries
  types/          cross-cutting types + AppError taxonomy
  logger/         zero-dep structured logger
  ui/             Tailwind v4 UI kit — tiered catalog (primitives/recipes/blocks) + examples
  environment/    typed env validation + env:doctor
  providers/      API clients, resilience utils, webhook verification
  database/       Drizzle ORM data layer (schema, queries, migrations)
  auth/           optional provider-agnostic signed-session primitives
```

Everything shares the `@monorepo-boilerplate/*` namespace. Rename it to your own
scope when you fork (search-and-replace `@monorepo-boilerplate`).

## Getting started

```bash
pnpm install          # installs the workspace; sets up git hooks
pnpm dev              # run all dev servers (web on http://localhost:3000)
```

Then verify everything works:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Run the MCP server on its own and inspect it:

```bash
pnpm --filter @monorepo-boilerplate/mcp-example build
npx @modelcontextprotocol/inspector node mcp-servers/example/dist/index.mjs
# call the `greet` tool with { "name": "World" } → "Hello, World!"
```

## Scripts (`command:segment:subsegment`)

| Command                             | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `pnpm dev`                          | run all dev servers                        |
| `pnpm build`                        | build all apps/packages (Turborepo-cached) |
| `pnpm lint` / `pnpm lint:fix`       | oxlint across the repo                     |
| `pnpm format` / `pnpm format:check` | oxfmt write / check                        |
| `pnpm typecheck`                    | `tsc --noEmit` per package                 |
| `pnpm test` / `pnpm test:unit`      | Vitest                                     |
| `pnpm test:e2e`                     | Playwright (web)                           |
| `pnpm lint:tokens`                  | ban non-token colors in UI/app classes     |
| `pnpm lint:catalog`                 | flag raw HTML where a kit component exists |
| `pnpm catalog:generate`             | regenerate the component catalog           |
| `pnpm catalog:check`                | fail if the catalog is stale (CI)          |
| `pnpm env:doctor`                   | validate environment variables             |
| `pnpm changeset`                    | record a versioned change                  |

## How internal-package HMR works

Every package under `packages/` sets its `exports` to **TypeScript source**
(`./src/*.ts`) — they have no build step. The web app lists the internal packages it
imports in `transpilePackages`, so Next transpiles them on the fly. Editing
`packages/ui/src/components/button.tsx` hot-reloads `apps/web` instantly, with no
rebuild or version bump. Only the MCP servers (`mcp-servers/example`, `mcp-servers/ui`)
are bundled (with tsdown), because they run as standalone Node processes — and tsdown
inlines the internal packages so there are no `.ts` imports at runtime.

Tailwind v4 follows the same source-first idea: `apps/web/src/app/globals.css` imports
`@monorepo-boilerplate/ui/styles.css`, which carries the design tokens and an
`@source` directive that points back at the kit's components — so utility classes used
inside the kit are always generated, from any consuming app.

## The component catalog

`packages/ui` is an **AI-consumable catalog**, not just a folder of components. Each
component is tiered (**Primitive** → **Recipe** → **Block** → Template) and described by
a committed, machine-readable record — its render environment, props, CVA variants,
authored intent, and a runnable example. The record is generated by
`tooling/catalog-extractor` from the component source plus a typed `*.catalog.ts`
sidecar (`pnpm catalog:generate`; `pnpm catalog:check` keeps it from drifting). Every
component must ship a `packages/ui/examples/<slug>.example.tsx`, rendered by the web
app at `/ui/<slug>` — "no example ⇒ not in catalog".

Agents query it through the **`mcp-ui`** MCP server: `search_components` (lexical
ranking — use first), `list_components`, `get_component`, `list_by_tier`,
`filter_by_render_environment`. Enforcement (`pnpm lint:catalog`, wired into lefthook +
CI) flags a raw `<button>` in an app where `Button` exists and direct imports of
styling primitives the kit re-exports. Full detail:
[`docs/phases/ui-kit-catalog.md`](./docs/phases/ui-kit-catalog.md).

## The agent convention layer

This repo treats AI agents as first-class contributors:

- **`AGENTS.md`** (root + per-package) is the canonical, cross-tool guidance. `CLAUDE.md`
  files `@import` it so the same rules work in Claude Code and other agents.
- **`.claude/reference/`** holds dense, on-demand styleguides: `typescript.md`, `react.md`,
  `nextjs.md`. Agents (and people) read the relevant one before writing code.
- **`.claude/skills/`** and **`.claude/commands/`** capture repeatable workflows
  (`add-ui-component`, `add-provider`, `/scaffold-package`, `/scaffold-ui-component`, `/verify`).
- **`.claude/settings.json`** wires a `PostToolUse` hook that auto-formats edited files
  with oxfmt.

Extend this layer as your conventions grow — it's the mechanism that keeps a large,
multi-contributor (human + agent) monorepo coherent.

## Using as a template

1. Click **Use this template** on GitHub (or fork).
2. Replace the `@monorepo-boilerplate` scope with your own.
3. Update `.github/CODEOWNERS` and `renovate.json` for your org.
4. Work through [`roadmap.md`](./roadmap.md) to grow it into a complete boilerplate.

## License

MIT — see [`LICENSE`](./LICENSE).
