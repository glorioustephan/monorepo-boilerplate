# CLAUDE.md

The canonical, cross-agent guidance lives in `AGENTS.md` — read it first.

@AGENTS.md

## Claude Code specifics

- **Reference files** in `.claude/reference/` are loaded on demand. Before writing
  code in a domain, read the matching file: `typescript.md`, `react.md`, `nextjs.md`.
- **Commands** (`.claude/commands/`): `/scaffold-package`, `/verify`, `/document`
  (language-aware doc comments + TODO digest refresh), `/audit` (review the diff against the
  reference docs as a rubric), `/prepare-pr` (verify + harvest + audit + changeset + PR draft).
- **Skills** (`.claude/skills/`): `add-ui-component`, `add-provider`.
- **Hooks** (`.claude/settings.json`, `PostToolUse`): `oxfmt-file.sh` auto-formats files you
  edit (never format by hand); `check-smells-file.sh` advisorily flags AI code smells
  (not-implemented stubs, empty catches, stray `any`/`console.log`, exports missing JSDoc).
- **TODO digest**: `docs/todo.md` is regenerated from code annotations on commit
  (`pnpm todos:generate`); fix the source comment rather than hand-editing the marked block.
- After non-trivial changes, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before
  declaring done (the `build` step catches the MCP servers' tsdown bundling failures).
