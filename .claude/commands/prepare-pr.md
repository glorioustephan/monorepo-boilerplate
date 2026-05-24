---
description: Opt-in pre-PR pipeline — verify, harvest TODOs, audit, changeset, and draft the PR
---

Run the full pre-PR pipeline against the current branch. This is **opt-in** and
**does not push or open a PR** unless the user explicitly asks at the end. Stop and
surface the first hard failure (gates); keep going through the advisory steps.

Steps:

1. **Verify** (reuse `/verify`): `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
   If `format:check` fails, run `pnpm format` and continue. Stop on any other gate
   failure and report it clearly.
2. **Harvest TODOs**: `pnpm todos:generate`, then stage `docs/todo.md`. Note the
   count and any ⚠ items missing an issue link.
3. **Audit**: run `/audit --branch` and surface its findings. These are advisory —
   summarize them so the user can decide, don't block on them.
4. **Changeset**: determine which changed packages are publishable (everything
   under `packages/` except those in `.changeset/config.json` `ignore` — `web` and
   both MCP servers are ignored). If such a package changed and no changeset exists
   in `.changeset/`, tell the user to run `pnpm changeset` (or draft one if asked).
5. **Draft the PR** (don't open it): propose a Conventional-Commit-style title
   (commitlint is enforced) and a body summarizing the change, the verification
   result, audit highlights, and a link to any new `docs/todo.md` entries. Present
   it for the user to review; open with `gh pr create` only on explicit request.
