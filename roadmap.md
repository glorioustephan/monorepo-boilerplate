# Roadmap

The plan for taking `@monorepo-boilerplate` from "working scaffold" to a complete,
batteries-included boilerplate that any team can fork and ship from. Phases are
roughly sequential, but later phases are intentionally looser — we'll refine them as
the earlier ones land. Each phase should leave the repo green (`pnpm lint typecheck
test build`) and update the agent convention layer (`AGENTS.md`, `.claude/`).

---

## Phase 0 — Foundation ✅ (this iteration)

The skeleton everything else builds on.

- [x] pnpm workspace (`apps/`, `tooling/`, `packages/`) with catalogs for version pinning.
- [x] Turborepo task pipeline (`build`, `dev`, `typecheck`, `test`, `test:e2e`, `env:doctor`).
- [x] Shared config packages: `ts-config`, `oxc-config` (oxlint + oxfmt), `test-config`.
- [x] `apps/web` — Next.js 16 + React 19 hello-world rendering a UI-kit component.
- [x] `mcp-servers/example` — MCP server (stdio) with a `greet` tool, bundled via tsdown.
- [x] `packages/ui` — Tailwind v4 kit (multi-theme, source-exported) with `Button`/`Card`.
- [x] `packages/environment` — t3-env + zod validation and an `env:doctor`.
- [x] `packages/providers` — example typed client + webhook verifier.
- [x] `packages/types` — cross-cutting types; `packages/database` placeholder.
- [x] Testing: Vitest unit tests + a Playwright e2e smoke test.
- [x] Tooling: lefthook git hooks, Changesets, GitHub Actions CI, issue/PR templates, renovate.
- [x] Cross-agent docs: canonical `AGENTS.md` (+ per-package), `CLAUDE.md` re-exports,
      `.claude/` reference styleguides, skills, commands, and an auto-format hook.

---

## Phase 1 — Hardening & DX ✅

Make the foundation production-grade and pleasant to work in daily.

- **Type-aware linting** in CI (oxlint + tsgolint) once stable in our setup; expand the
  oxlint rule set in `tooling/oxc-config` and document additions in `reference/typescript.md`.
- **Commit conventions**: commitlint (Conventional Commits) wired into lefthook `commit-msg`.
- **Logging/observability seam**: a small `packages/logger` (structured, level-aware) used
  by the web app and MCP server; document the pattern.
- **Error & loading UX** in `apps/web`: `error.tsx`, `not-found.tsx`, `loading.tsx`, an
  error-boundary pattern, and a typed `Result`-based error story (`packages/types`).
- **Editor DX**: `.vscode/extensions.json` + `settings.json` (oxc extension, format-on-save),
  recommended setup notes in the README.
- **`env:doctor` polish**: richer reporting, `.env.example` generation, CI check that all
  required vars are documented.
- **Turborepo remote caching** docs (optional, opt-in) and `--affected` usage in CI.

---

## Phase 2 — Data layer ✅

Turn `packages/database` from placeholder into a real, ORM-agnostic foundation.

- Choose and wire an ORM/query layer (e.g. Drizzle) behind a thin internal API so the
  choice stays swappable.
- `schema/` (definitions), `queries/` (typed, reusable), `migrations/` (generated).
- Real `db:generate` / `db:migrate` / `db:seed` scripts replacing the no-op stubs.
- Database connection + pooling helper that reads from validated `env` only.
- A local dev database story (Docker Compose service) and CI integration tests.
- Document data-access conventions in a `packages/database/AGENTS.md` + reference file.

---

## Phase 3 — Providers & integrations ✅

Grow `packages/providers` into a robust integration layer.

- Replace the example with one or two real providers; standardize the typed-fetch +
  zod-validation pattern and error normalization.
- First-class **webhook handling**: signature verification, idempotency, typed event
  routing, and a Next.js route-handler pattern in `apps/web`.
- Shared resilience utilities: retries with backoff, rate limiting, timeouts, circuit-breaking.
- A shared `Result`/error taxonomy so providers fail predictably.

---

## Phase 4 — Auth & sessions (optional module) ✅

A pluggable, framework-generic authentication pattern that consumers can keep or drop.

- Session pattern in `apps/web` via the Next 16 proxy (`src/proxy.ts`) kept provider-agnostic.
- Typed `auth()` accessor for Server Components and route handlers.
- Clear seams for the chosen auth provider; secrets flow through validated `env`.
- Document as an opt-in module so the boilerplate stays useful for apps that don't need auth.

---

## Phase 5 — Deployment & release ✅

Make shipping a non-event.

- **Vercel** config via `vercel.ts` for `apps/web`; preview-deploy wiring and env-var
  management documented (`vercel env`).
- A **Dockerfile** (or container build) for `mcp-servers/example` and a publish workflow.
- **Release automation**: Changesets-driven versioning + changelog + (optional) npm
  publish for the shareable packages, gated in CI.
- Rollback/preview/promotion notes; CI matrix for the supported Node versions.

---

## Phase 6 — UI library + internal MCP server (final, intentionally open-ended) ✅ (built out in the U-track)

The capstone: evolve `packages/ui` from a starter kit into a **full, themed component
library that exposes its own internal MCP server** — so AI agents can query component
metadata, props, variants, and usage examples while building UIs.

> **Seeded in this iteration:** a machine-readable component registry
> (`packages/ui/src/registry.ts`), `mcp-servers/ui` exposing it via `list_components` /
> `get_component` tools, and a starter component set (Button, Card, Input, Badge) on a
> multi-theme Tailwind v4 base. The architecture and seams are in place; the items below
> remain intentionally open-ended for adopters to grow into their own design system.

This phase is deliberately **non-specific**: the boilerplate must stay usable
out-of-the-box for _any_ UI approach, so we won't prescribe a particular design system.
Directionally:

- Expand the component set and document each with structured metadata (props, variants,
  a11y notes, usage examples) — colocated and machine-readable.
- A **UI-kit MCP server** that surfaces that metadata as tools/resources (e.g. "list
  components", "get component API", "suggest usage"), so agents compose UIs accurately.
- **Multi-theme architecture** matures: the kit ships several Tailwind v4 themes as CSS
  token layers; the **consuming app always owns its Tailwind configuration** and imports
  the kit from source (preserving HMR). Themes are opt-in and swappable at runtime.
- Optional: a documentation/preview surface (e.g. Storybook) generated from the same
  metadata, kept independent of any specific design language.

Because this is the end state and the most app-specific, it should remain a _pattern and
a set of seams_ rather than a fixed implementation — adopters wire in their own design
system on top of the provided architecture.

---

## UI-Kit Expansion track (U0–U8) ✅

The Phase 6 seams above were grown into a full, AI-consumable **component catalog**.
Detail: [`docs/phases/ui-kit-catalog.md`](./docs/phases/ui-kit-catalog.md).

- [x] **U0** — MCP servers moved to `mcp-servers/`; `services/` reserved; root `.mcp.json`.
- [x] **U1** — semantic token contract + theming + `lint:tokens` bypass guard.
- [x] **U2** — catalog schema + codegen (`tooling/catalog-extractor` → committed
      `registry.generated.ts` from source + typed `*.catalog.ts` sidecars).
- [x] **U3** — interactive primitives via unified `radix-ui` (Dialog/Tooltip/Select).
- [x] **U4** — Recipe (ConfirmDialog, FormField) and Block (Hero, Cta, FeatureGrid) tiers.
- [x] **U5** — example corpus + RSC harness (`/ui/[component]`); "no example ⇒ not in catalog".
- [x] **U6** — `mcp-ui` lexical search (`search_components`, tier/render-env filters).
- [x] **U7** — `tooling/catalog-lint` AST enforcement (raw-HTML / require-ui-import) in
      lefthook + CI + a `.claude` hook.
- [x] **U8** — docs, `/scaffold-ui-component`, Changesets publish flow for `ui`, and the
      **opt-in semantic layer documented** (ONNX MiniLM `embeddings.json` + brute-force JS
      cosine fused with lexical) — intentionally not built by default to keep installs lean.

---

## Cross-cutting, ongoing

- Keep `AGENTS.md` / `.claude/reference/*` in lockstep with the code as conventions evolve.
- Keep the dependency catalog current (renovate) and majors reviewed deliberately.
- Every new capability ships with: tests, a doc/reference update, and (if it adds a
  repeatable workflow) a `.claude/` skill or command.
