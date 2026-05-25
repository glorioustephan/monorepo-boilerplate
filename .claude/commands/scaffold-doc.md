---
description: Create a new VitePress documentation page and register it in the sidebar
argument-hint: <slug> "<Title>" "<description>"
---

Scaffold a new documentation page in the `docs/` VitePress site from `$ARGUMENTS`:

- First token: `slug` (kebab-case, no `.md`) → becomes `docs/<slug>.md` (or
  `docs/<group>/<slug>.md` if a subsection like `phases/` fits).
- Second token (quoted): the page **Title** (frontmatter + sidebar text).
- Third token (quoted): a one-sentence **description** (frontmatter).

**Read `.claude/reference/documentation.md` first** — it owns frontmatter, link, sidebar,
and voice rules. Do not duplicate `AGENTS.md`/`.claude/reference/` content; summarize and link.

Steps:

1. **Pick the sidebar group**: Getting Started / Design & Architecture / Project Status. Ask the
   user if it isn't obvious from the slug.
2. **Create `docs/<slug>.md`** with:
   - A frontmatter block (`title`, `description`) as the first content.
   - An `# H1` matching the title and a one-paragraph orientation. If you don't know the real
     content, leave `<!-- TODO: fill in -->` rather than inventing it.
3. **Register it** in `docs/.vitepress/config.ts`: add `{ text: "<Title>", link: "/<slug>" }` to
   the chosen sidebar group (and a `nav` entry only if it's a top-level concept). Keep `nav` and
   `sidebar` consistent.
4. **Verify links**: run `pnpm docs:build` and confirm no dead links.
5. **Format**: run `pnpm format` on the new page and the config.
6. Report the files created/changed and the build result.
