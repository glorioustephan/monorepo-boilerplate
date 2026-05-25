---
description: Add language-appropriate doc comments to changed code and refresh docs/todo.md
argument-hint: [<path>|--staged]
---

Document recently-written code and refresh the TODO digest. Scope is `$ARGUMENTS`:
a path limits work to that directory/file, `--staged` limits it to staged changes,
and no argument means the current uncommitted diff (`git diff --name-only HEAD`).
Read `.claude/reference/typescript.md` (the JSDoc rules) before writing code comments,
and `.claude/reference/documentation.md` before touching any `docs/` page.

Steps:

1. **Refresh the digest**: run `pnpm todos:generate` so `docs/todo.md` reflects
   every annotation currently in source. Report how many it found.
2. **Document undocumented code** in scope, using each language's convention.
   Describe _what and why_, never _how_ (the reference's rule). Skip anything that
   is already documented — do not churn existing comments.
   - **TypeScript/TSX** (`.ts`/`.tsx`): a `/** … */` JSDoc on every exported
     symbol (function, const, class, interface, type) per `typescript.md`. The
     `check-smells` hook flags these as `missing-jsdoc` — clear those.
   - **SQL** (`packages/database/migrations/*.sql`): a leading `--` comment block
     stating what the migration does and why; `--` notes on non-obvious columns.
   - **Shell** (`.sh`): a `#` header comment after the shebang describing the
     script's job and its fail-open/closed behavior (match `.claude/hooks/*.sh`).
   - **Theme CSS** (`packages/ui/src/themes/*.css`): a `/* … */` section comment
     where token groups are defined.
3. **Do not invent semantics.** If a symbol's intent is unclear, leave a
   `// TODO(#…): clarify` rather than guessing — it will surface in the next digest.
4. **Groom docs pages** for any `.md` in scope under `docs/` (skip `docs/todo.md` — it is
   machine-owned; never edit between its generated markers). Per
   `.claude/reference/documentation.md`: ensure `title`/`description` frontmatter is present,
   the page is registered in `docs/.vitepress/config.ts`, and internal links keep their `.md`
   extension. If you changed any link or added a page, run `pnpm docs:build` to confirm no dead
   links. Summarize, don't duplicate, `AGENTS.md`/`.claude/reference/` content.
5. **Verify**: `pnpm typecheck && pnpm lint` (and `pnpm docs:build` if docs changed). Report the
   files documented, any docs groomed, and the current `docs/todo.md` count.
