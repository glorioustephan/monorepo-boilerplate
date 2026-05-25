---
title: Conventions & Contributing
description: Orientation for working in the monorepo — layout, scripts, and how to add packages, components, and docs.
---

# Conventions & Contributing

A human-friendly orientation to working in this repo. The **canonical, machine-readable
source of truth is `AGENTS.md`** at the repo root (re-exported by `CLAUDE.md`), with dense
domain styleguides in `.claude/reference/` (`typescript.md`, `react.md`, `nextjs.md`,
`tailwind.md`, `documentation.md`). This page summarizes and links into the work; when the
two disagree, `AGENTS.md` wins. Don't duplicate convention detail here — extend `AGENTS.md`
and cross-link.

## Layout

```
apps/          user-facing deliverables (web)
mcp-servers/   internal MCP servers (example, ui)
services/      reserved for future backend services
tooling/       config-only + build-time tooling (ts-config, oxc-config, test-config,
               catalog-codegen, catalog-lint, annotations)
packages/      real libraries (types, logger, ui, environment, providers, database, auth)
docs/          this VitePress documentation site
```

All packages share the `@monorepo-boilerplate/*` namespace. Rename it to your own scope when
you fork.

## Golden rules

- **TypeScript everywhere, strict.** No enums (string-literal unions); `interface` for object
  shapes; `import type`; guard every index access.
- **Lint with oxlint, format with oxfmt.** Never hand-format — run `pnpm format`.
- **Internal packages are consumed from source** (their `exports` point at `.ts`); this gives
  HMR across package boundaries. Only the MCP servers build (via tsdown).
- **Centralize dependency versions** in `pnpm-workspace.yaml` `catalog:`; reference as
  `"catalog:"`. Use `workspace:*` for internal deps.
- **Color comes from Radix Themes props** (`color`/`variant`/`size`/`radius`), never Tailwind
  color classes; Tailwind is for layout/spacing only. `@radix-ui/*` is importable **only** inside
  `packages/ui` (`pnpm lint:catalog`); raw/arbitrary colors are banned (`pnpm lint:tokens`).

## Scripts

Run from the repo root; Turborepo fans out and caches.

| Command                                | What it does                                               |
| -------------------------------------- | ---------------------------------------------------------- |
| `pnpm dev`                             | run all dev servers (web + docs)                           |
| `pnpm build`                           | build everything, incl. the docs dead-link check           |
| `pnpm lint` / `pnpm format`            | oxlint / oxfmt over the repo                               |
| `pnpm typecheck` / `pnpm test`         | `tsc --noEmit` / Vitest                                    |
| `pnpm test:e2e`                        | Playwright (web)                                           |
| `pnpm docs:dev` / `pnpm docs:build`    | VitePress dev server / build (dead-link gate)              |
| `pnpm ui:codegen` / `ui:codegen:check` | regenerate / verify the kit's generated component layer    |
| `pnpm todos:generate`                  | refresh the [TODO digest](./todo.md) from code annotations |

## Adding things

- **A package**: `/scaffold-package` — decide `apps/` vs `tooling/` vs `packages/`, extend the
  right `ts-config` preset, source-pointing `exports` for libraries.
- **A UI component**: `/scaffold-ui-component` (or the `add-ui-component` skill) — add a Radix
  component via the manifest + `pnpm ui:codegen`, or hand-build a recipe/block/template composing
  the kit's components (with example, story, and test).
- **A provider**: copy `packages/providers/src/example` and add a subpath export.
- **A documentation page**: `/scaffold-doc <slug> "<Title>" "<description>"` — see
  `.claude/reference/documentation.md` for frontmatter, sidebar registration, and link rules.

## The agent convention layer

This repo treats AI agents as first-class contributors. `AGENTS.md` is canonical cross-tool
guidance; `.claude/reference/` holds on-demand styleguides read before writing code or docs;
`.claude/skills/` and `.claude/commands/` capture repeatable workflows; and `.claude/hooks/`
auto-format and advise on edits. Grow this layer as conventions evolve — it is what keeps a
large, multi-contributor (human + agent) monorepo coherent.
