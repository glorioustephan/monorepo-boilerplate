---
description: Scaffold a new workspace package following repo conventions
argument-hint: <package-name> [apps|tooling|packages]
---

Scaffold a new workspace package from `$ARGUMENTS` (first token = name, second =
target folder, defaulting to `packages`). Follow `AGENTS.md` conventions exactly.

Steps:

1. **Pick the folder**: `apps/` (runnable), `tooling/` (config-only, ships nothing),
   or `packages/` (a real library). Confirm with the user if ambiguous.
2. Create `<folder>/<name>/package.json`:
   - `"name": "@monorepo-boilerplate/<name>"`, `"version": "0.0.0"`, `"private": true`, `"type": "module"`.
   - Libraries: `"exports": { ".": "./src/index.ts" }` (point at **source**, no build step).
   - Add a `"typecheck": "tsc --noEmit"` script; add `test`/`build` only if relevant.
   - Internal deps use `"workspace:*"`; shared external deps use `"catalog:"` (add to
     `pnpm-workspace.yaml` `catalog:` first if new).
3. Create `<folder>/<name>/tsconfig.json` extending the right preset:
   `@monorepo-boilerplate/ts-config/{base|node|react-library|next}.json`, with `"include": ["src"]`.
4. Add `src/index.ts` with a real export. For a shared **library** package containing React
   (i.e. in `packages/`), add an `.oxlintrc.json` extending `../../tooling/oxc-config/react.json`;
   for a Node-only package, extend `node.json`. Apps rely on their own/root config.
5. Add a `{ "path": "<folder>/<name>" }` entry to the root `tsconfig.json` `references` array so
   editors resolve cross-package go-to-definition.
6. If it has local conventions, add a short `AGENTS.md` + a one-line `CLAUDE.md` (`@AGENTS.md`).
7. Run `pnpm install`, then `pnpm typecheck && pnpm lint` and fix anything that fails.

Report the files created and the verification result.
