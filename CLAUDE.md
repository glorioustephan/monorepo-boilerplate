# CLAUDE.md

The canonical, cross-agent guidance lives in `AGENTS.md` — read it first.

@AGENTS.md

## Claude Code specifics

- **Reference files** in `.claude/reference/` are loaded on demand. Before writing
  in a domain, read the matching file: `typescript.md`, `react.md`, `nextjs.md`, `tailwind.md`,
  and `documentation.md` (before editing any `docs/` page).
- **Commands** (`.claude/commands/`): `/scaffold-package`, `/scaffold-ui-component`,
  `/scaffold-doc` (new VitePress page + sidebar registration), `/verify`, `/document`
  (language-aware doc comments + docs grooming + TODO digest refresh), `/audit` (review the diff
  against the reference docs as a rubric), `/prepare-pr` (verify + harvest + audit + changeset + PR draft).
- **Skills** (`.claude/skills/`): `add-ui-component`, `add-provider`.
- **Hooks** (`.claude/settings.json`, `PostToolUse`): `oxfmt-file.sh` auto-formats files you
  edit (never format by hand); `check-smells-file.sh` advisorily flags AI code smells
  (not-implemented stubs, empty catches, stray `any`/`console.log`, exports missing JSDoc).
- **TODO digest**: `docs/todo.md` is regenerated from code annotations on commit
  (`pnpm todos:generate`) and surfaced as a page in the docs site; fix the source comment rather
  than hand-editing the marked block.
- **Docs site**: documentation lives in the `docs/` VitePress project. `pnpm docs:dev` to browse;
  `pnpm docs:build` (part of `pnpm build`) fails on dead links. Author per `documentation.md`.
- After non-trivial changes, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before
  declaring done (the `build` step catches the MCP servers' tsdown bundling failures and dead
  documentation links).
