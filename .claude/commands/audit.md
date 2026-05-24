---
description: Review the diff against this repo's own conventions (anti-patterns, smells, bloat, doc drift)
argument-hint: [--staged|--branch|<path>]
---

Audit changed code **against this repository's documented conventions** — not
generic best practices. This is the differentiator from the built-in `/review`:
the rubric is _our_ docs, so when a convention changes, the audit changes with it.
The audit is **advisory** — report findings and propose fixes; do not edit files
unless the user asks.

Steps:

1. **Load the rubric**: read `AGENTS.md` and the relevant
   `.claude/reference/{typescript,react,nextjs,tailwind}.md`. Also read the
   nearest package `AGENTS.md` for files in scope.
2. **Get the diff** from `$ARGUMENTS`:
   - `--staged` → `git diff --staged`
   - `--branch` → `git diff main...HEAD` (the whole branch)
   - a path → review that path
   - no argument → `git diff HEAD` (current uncommitted changes)
3. **Run the deterministic pass first** so the LLM review builds on it, not
   duplicates it: `pnpm exec tsx tooling/catalog-lint/src/check-smells.ts <files>`
   and `pnpm lint`. Fold their output into the report.
4. **Review against the rubric** for:
   - **Anti-patterns / convention violations** — e.g. `process.env` read directly
     (must use typed `env`), un-awaited async request APIs, hand-written
     `useMemo`/`useCallback` (React Compiler is on), default exports where named is
     required, `console.log` in an MCP server, secrets defaulting to `""`.
   - **Naive placeholders** — not-implemented stubs, empty handlers, hard-coded
     returns standing in for real logic.
   - **Code bloat** — over-abstraction, premature generics, dead/unreachable code,
     unused exports, comments that merely restate the code, defensive checks for
     conditions that can't occur.
   - **Missing docs** — exports without the JSDoc `typescript.md` requires.
   - **Doc drift** — claims in `AGENTS.md`/reference that the diff makes untrue
     (a renamed/removed script still documented, a convention now contradicted).
     Recommend the doc edit, not just the code fix.
5. **Report** findings grouped by severity, each as `file:line` + a one-line
   concrete fix. End with a short verdict: is this lean and on-convention, or does
   it need work before committing? Suggest `/document` if docs are the main gap.
