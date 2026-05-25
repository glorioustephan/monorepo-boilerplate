# AGENTS.md

Canonical, cross-agent guidance for this repository. Works with Claude Code,
Cursor, and any tool that reads `AGENTS.md`. `CLAUDE.md` files re-export this.
Keep it accurate — agents and humans both rely on it.

## What this is

`@monorepo-boilerplate` is an opinionated **Turborepo + pnpm** monorepo template:
Next.js 16 + React 19 web app, a Model Context Protocol server, and shared
packages. It is meant to be forked as the starting point for new monorepos.

## Layout

```
apps/          user-facing deliverables
  web/            Next.js 16 (App Router, Turbopack, React Compiler)
mcp-servers/   internal MCP servers (agent/dev tooling; bundled with tsdown)
  example/        generic hello-world MCP server (stdio)
  ui/             exposes the UI kit's component catalog to agents
services/      RESERVED for future backend services (README only; not built)
tooling/       config-only + build-time tooling (ship nothing at runtime)
  ts-config/   TypeScript presets (base/node/react-library/next)
  oxc-config/  oxlint presets + oxfmt config
  test-config/ Vitest + Playwright presets
  annotations/ harvests code TODO/FIXME/@deprecated markers → docs/todo.md
packages/    real libraries (ship code; consumed from source)
  types/       cross-cutting shared types + error taxonomy (keep small)
  logger/      zero-dep structured logger (stderr-safe for the MCP servers)
  ui/          Tailwind v4 UI kit, consumed from source for HMR
  environment/ t3-env + zod env validation, env:doctor helper
  providers/   third-party API clients + webhook handlers + resilience utils
  database/    Drizzle ORM data layer (schema, queries, migrations)
  auth/        optional provider-agnostic signed-session primitives
```

All packages share the `@monorepo-boilerplate/*` namespace. `apps/` = products,
`mcp-servers/` = agent tooling, `services/` = future backends — keep them distinct.

## Golden rules

- **TypeScript everywhere, strict.** Follow `.claude/reference/typescript.md`. The
  tsconfig is strict with `noUncheckedIndexedAccess` and `verbatimModuleSyntax`.
- **Lint with oxlint, format with oxfmt.** Never hand-format; run `pnpm format`.
  Rules live in `tooling/oxc-config/`. Don't restate them in code review — fix and move on.
- **Internal packages are consumed from source** (their `exports` point at `.ts`).
  This is deliberate — it gives HMR across package boundaries. Do not add build
  steps to library packages; only the MCP servers (`mcp-servers/example`,
  `mcp-servers/ui`) build (via tsdown), since they run as standalone Node processes.
- **Centralize dependency versions** in `pnpm-workspace.yaml` `catalog:`. Add a new
  shared dep there and reference it as `"catalog:"` — never pin versions per package.
- **Use `workspace:*`** for internal dependencies.
- **Don't read `process.env` directly in app code.** Import the typed `env` from the
  app's `src/env.ts` (built on `@monorepo-boilerplate/environment`).

## Domain references (read before writing code in that area)

- TypeScript style → `.claude/reference/typescript.md`
- React 19 / RSC / Compiler → `.claude/reference/react.md`
- Next.js 16 → `.claude/reference/nextjs.md`

## Scripts (`command:segment:subsegment`)

Run from the repo root; Turborepo fans out and caches.

| Command                               | What it does                              |
| ------------------------------------- | ----------------------------------------- |
| `pnpm dev`                            | run all dev servers                       |
| `pnpm build`                          | build everything (cached)                 |
| `pnpm lint` / `pnpm lint:fix`         | oxlint over the repo (nested configs)     |
| `pnpm format` / `pnpm format:check`   | oxfmt write / check                       |
| `pnpm typecheck`                      | `tsc --noEmit` per package                |
| `pnpm test` / `pnpm test:unit`        | Vitest                                    |
| `pnpm test:e2e`                       | Playwright (web)                          |
| `pnpm env:doctor`                     | validate environment variables            |
| `pnpm changeset`                      | record a versioned change                 |
| `pnpm todos:generate` / `todos:check` | harvest code annotations → `docs/todo.md` |

Verify a change end-to-end with: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

## Adding things

- **A shared dependency**: add to `pnpm-workspace.yaml` `catalog:`, then reference `"catalog:"`.
- **A new package**: see the `scaffold-package` command/skill in `.claude/`. Decide
  `apps/` vs `tooling/` vs `packages/`; give it a `package.json`, a `tsconfig.json`
  extending the right `ts-config` preset, and source-pointing `exports` if it's a library.
- **A UI component**: follow the `add-ui-component` skill; match the `Button` pattern.
- **A provider**: copy `packages/providers/src/example` and add a subpath export.

## Conventions that bite

- Next.js request APIs (`params`, `searchParams`, `cookies()`, `headers()`) are **async** — `await` them.
- React Compiler is on; **don't** hand-write `useMemo`/`useCallback` for performance.
- In the MCP server, **never write to stdout** (`console.log`) — stdio is the JSON-RPC channel; log to stderr.
- Default exports only where a framework requires them (Next special files, config files); named exports otherwise.
- **Secrets have dev defaults, not prod ones.** `SESSION_SECRET` falls back to an insecure dev
  value — set a 32+ char random value in production. `WEBHOOK_SECRET` is optional and the webhook
  route fails **closed** when it's unset (rejects requests) — never make secrets default to `""`.
