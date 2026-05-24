# CLAUDE.md

The canonical, cross-agent guidance lives in `AGENTS.md` — read it first.

@AGENTS.md

## Claude Code specifics

- **Reference files** in `.claude/reference/` are loaded on demand. Before writing
  code in a domain, read the matching file: `typescript.md`, `react.md`, `nextjs.md`.
- **Commands** (`.claude/commands/`): `/scaffold-package`, `/verify`.
- **Skills** (`.claude/skills/`): `add-ui-component`, `add-provider`.
- **Hook**: a `PostToolUse` hook (`.claude/settings.json` → `.claude/hooks/oxfmt-file.sh`)
  auto-formats files you edit with oxfmt, so you never need to format by hand.
- After non-trivial changes, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before
  declaring done (the `build` step catches the MCP servers' tsdown bundling failures).
