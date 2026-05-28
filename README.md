# @monorepo-boilerplate

> An opinionated **Turborepo + pnpm** monorepo template, built to be forked as the
> starting point for new projects.

<p align="center">
  <a href="https://github.com/glorioustephan/monorepo-boilerplate/actions/workflows/ci.yml"><img src="https://github.com/glorioustephan/monorepo-boilerplate/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/code%20style-oxlint%20%2B%20oxfmt-6E40C9" alt="Code style: oxlint + oxfmt">
  <img src="https://img.shields.io/badge/node-%E2%89%A522-339933?logo=node.js&logoColor=white" alt="Node >= 22">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome">
  <br>
  <img src="https://img.shields.io/badge/Turborepo-2-EF4444?logo=turborepo&logoColor=white" alt="Turborepo 2">
  <img src="https://img.shields.io/badge/pnpm-workspaces-F69220?logo=pnpm&logoColor=white" alt="pnpm workspaces">
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript (strict)">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind v4">
</p>

It ships a working Next.js 16 + React 19 web app, a Model Context Protocol (MCP) server, a
themable **Radix Themes UI kit** — including a full **AI-chat component family** (chat input,
streaming messages, markdown + syntax-highlighted code, tool-calling, reasoning, and ready-made
chatbot templates) — with a Storybook workshop and a runtime theme switcher, plus a cohesive
**cross-agent convention layer** so both humans and AI coding agents stay consistent.

> **Status:** **Phases 0–6 complete** (see the [roadmap](./docs/roadmap.md)) — foundation,
> hardening, data layer, providers, auth, deployment, and a UI kit with its own MCP server. The kit
> has since grown into a tiered, AI-consumable **component catalog** (UI-Kit Expansion track U0–U8;
> see the [UI Kit Catalog](./docs/phases/ui-kit-catalog.md) docs) and an AI-chat component family
> ported from [prompt-kit](https://www.prompt-kit.com/) onto Radix Themes. This is a living
> boilerplate; keep iterating holistically.

## Documentation

Full documentation lives in the **VitePress site** under [`docs/`](./docs) — run
`pnpm docs:dev` to browse it locally, `pnpm docs:build` to build it (with dead-link
checking). Start with [Conventions](./docs/conventions.md), the
[Roadmap](./docs/roadmap.md), [Deployment](./docs/deployment.md), and the
[UI Kit Catalog](./docs/phases/ui-kit-catalog.md). Canonical cross-agent guidance stays in
`AGENTS.md` + `.claude/reference/` (the site links to them).

## Why this exists

Spinning up a new monorepo means re-deciding the same things every time: workspace
layout, TypeScript config, linting/formatting, testing, CI, versioning, and the
conventions that keep a growing codebase coherent. This template makes those
decisions once — with current (2026) tooling — and encodes them so they're
discoverable by people and agents alike.

## Stack

| Area          | Choice                                                                     |
| ------------- | -------------------------------------------------------------------------- |
| Monorepo      | Turborepo 2 + pnpm workspaces (with **catalogs** for version pinning)      |
| Web           | Next.js 16 (App Router, Turbopack, React Compiler)                         |
| UI            | React 19 + Radix Themes kit (Tailwind v4 for layout), consumed from source |
| MCP           | `@modelcontextprotocol/sdk` over stdio                                     |
| Language      | TypeScript (strict)                                                        |
| Lint / format | **oxlint + oxfmt** (Rust, fast)                                            |
| Env           | `@t3-oss/env-nextjs` + zod, with an `env:doctor`                           |
| Testing       | Vitest (unit) + Playwright (e2e)                                           |
| Versioning    | Changesets                                                                 |
| Git hooks     | lefthook                                                                   |

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
  ui/             Radix Themes UI kit — generated components/ + recipes/blocks/templates, Storybook
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

| Command                             | Description                                       |
| ----------------------------------- | ------------------------------------------------- |
| `pnpm dev`                          | run all dev servers                               |
| `pnpm build`                        | build all apps/packages (Turborepo-cached)        |
| `pnpm lint` / `pnpm lint:fix`       | oxlint across the repo                            |
| `pnpm format` / `pnpm format:check` | oxfmt write / check                               |
| `pnpm typecheck`                    | `tsc --noEmit` per package                        |
| `pnpm test` / `pnpm test:unit`      | Vitest                                            |
| `pnpm test:e2e`                     | Playwright (web)                                  |
| `pnpm docs:dev` / `pnpm docs:build` | VitePress docs (build = dead-link gate)           |
| `pnpm lint:tokens`                  | ban non-token colors in UI/app classes            |
| `pnpm lint:catalog`                 | enforce Radix encapsulation + kit usage           |
| `pnpm ui:codegen`                   | regenerate the kit's atom layer from the manifest |
| `pnpm ui:codegen:check`             | fail if the atom layer is stale (CI)              |
| `pnpm env:doctor`                   | validate environment variables                    |
| `pnpm changeset`                    | record a versioned change                         |

## How internal-package HMR works

Every package under `packages/` sets its `exports` to **TypeScript source**
(`./src/*.ts`) — they have no build step. The web app lists the internal packages it
imports in `transpilePackages`, so Next transpiles them on the fly. Editing
`packages/ui/src/blocks/Hero.tsx` hot-reloads `apps/web` instantly, with no
rebuild or version bump. Only the MCP servers (`mcp-servers/example`, `mcp-servers/ui`)
are bundled (with tsdown), because they run as standalone Node processes — and tsdown
inlines the internal packages so there are no `.ts` imports at runtime.

Tailwind v4 follows the same source-first idea: `apps/web/src/app/globals.css` imports
Tailwind + Radix Themes, then `@monorepo-boilerplate/ui/styles.css`, which layers in the kit's
custom accents and an `@source` directive pointing back at the kit — so utility classes used
inside the kit are always generated, from any consuming app.

## The UI kit and its catalog

`packages/ui` is the single, **enforced** UI vocabulary, built on **Radix Themes**: a generated
component layer (`components/`, sub-foldered by category, from `components.manifest.ts` via
`pnpm ui:codegen`) plus authored `recipes/` → `blocks/` → `templates/`. Color comes from Radix
props; `pnpm lint:catalog` makes `@radix-ui/*` importable **only** inside `packages/ui`, so the
kit stays the one front door. The component **catalog** (search/retrieval for agents) is owned by
the **`mcp-ui`** MCP server, which scrapes the kit at build time into a `node:sqlite` database and
serves **hybrid search** — FTS5 lexical fused with MiniLM semantic similarity. On top of the
general-purpose recipes/blocks/templates, the kit ships a complete **AI-chat component family**
(ported from [prompt-kit](https://www.prompt-kit.com/) onto Radix Themes): `PromptInput`, `Message`,
`ChatContainer`, `Markdown`, `CodeBlock` (Shiki, dual light/dark themes), `Loader`, `Reasoning`,
`Tool`, `Steps`, `ResponseStream`, and `Chatbot`/`ToolCalling` page templates wired by a headless
`useChat` hook. Theme switching (light/dark, accent, gray, radius, scaling) is live via the kit's
`ThemeProvider`/`ThemeSwitcher`; explore every component themed in Storybook
(`pnpm --filter @monorepo-boilerplate/ui storybook`).

## The agent convention layer

This repo treats AI agents as first-class contributors: **`AGENTS.md`** (root + per-package)
is the canonical cross-tool guidance (`CLAUDE.md` re-exports it); **`.claude/reference/`** holds
dense on-demand styleguides; **`.claude/skills/`** and **`.claude/commands/`** capture repeatable
workflows; and **`.claude/settings.json`** wires `PostToolUse` hooks that auto-format and advise
on edits. The [Conventions](./docs/conventions.md) page is the human-friendly tour; extend the
layer as your conventions grow.

## Using as a template

1. Click **Use this template** on GitHub (or fork).
2. Replace the `@monorepo-boilerplate` scope with your own.
3. Update `.github/CODEOWNERS` and `renovate.json` for your org.
4. Work through the [roadmap](./docs/roadmap.md) to grow it into a complete boilerplate.

## License

MIT — see [`LICENSE`](./LICENSE).
