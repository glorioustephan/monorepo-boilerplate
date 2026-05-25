# Documentation Style Guide — @monorepo-boilerplate

Authoring rules for the **VitePress docs site** in `docs/` (`@monorepo-boilerplate/docs`).
Read this before creating or editing any page under `docs/`. Formatting is owned by
**oxfmt** — never hand-format markdown; run `pnpm format`.

The site is the browsable doc home. It does **not** replace `AGENTS.md` / `.claude/reference/`,
which stay the canonical, machine-readable source for conventions — the site links to them.

---

## 1. When to add a page vs. extend one

- Add a page for a **distinct concept** that deserves its own URL and sidebar entry.
- Extend an existing page when the content is a subsection of what already exists (a new
  deployment target, a new phase write-up, another script).
- **Do not duplicate** `AGENTS.md` or `.claude/reference/` content into the site. Summarize and
  cross-link; those files win on any disagreement.
- Every new page **must** be registered in `docs/.vitepress/config.ts` before merging — an
  unregistered page builds but is unreachable from nav/sidebar. `/scaffold-doc` does this for you.

---

## 2. Frontmatter

Every content page starts with a frontmatter block as the very first thing in the file
(above the `# H1`, and above any preamble — including the generated `todo.md`):

```yaml
---
title: Short Page Title
description: One informative sentence (used for sidebar text and meta/OG tags).
---
```

- `title` drives the browser tab and OG tags; the in-page `# H1` is separate page content
  (keep both, they may differ slightly — e.g. `title: TODO Digest` over a `# TODO` heading).
- The home page `docs/index.md` uses `layout: home` with `hero:`/`features:` — **only** the
  home page uses `layout: home`.
- Add `outline: deep` on long pages to surface `###` headings in the right-hand TOC.
- There is no `draft:` support — don't merge incomplete pages.

---

## 3. Page structure

- One `# H1` matching the `title`, then a one-paragraph orientation: what this is, who it's
  for, why it matters.
- `##` for major sections, `###` for subsections; avoid `####` (it flattens the TOC).
- Reference/procedural pages: dense prose, concrete code over filler — match the register of
  `.claude/reference/typescript.md`.
- Concept pages: lead with the concept, then constraints, then examples.

---

## 4. Links

VitePress resolves internal links relative to the `docs/` root and **dead-link checks them at
build time** (`pnpm docs:build` / `pnpm build` fails on a dead link).

- Use root-relative or page-relative paths and **keep the `.md` extension** — the checker needs
  it to resolve (VitePress strips it from the output URL): `[Deployment](./deployment.md)`.
- External links (GitHub, npm, …) are not checked — fine to use freely.
- **Do not** link to `AGENTS.md` / `CLAUDE.md` / `.claude/**` with relative paths — they live
  outside `docs/`, so the link won't resolve in the built site. Reference them as inline code
  (`` `AGENTS.md` ``) or, once the repo has a remote, a full GitHub URL.
- After moving or renaming a page, grep the whole `docs/` tree for the old path, update every
  reference, and run `pnpm docs:build` to confirm no dead links remain.

---

## 5. Sidebar & nav registration

Both live in `docs/.vitepress/config.ts` under `themeConfig`. Maintain the existing groups:

- **Getting Started** — orientation and setup (home, conventions, deployment).
- **Design & Architecture** — roadmap, phase write-ups, design decisions.
- **Project Status** — generated/maintained pages (the TODO digest).

Add a page's `{ text, link }` to the right group. Only add a top-level `nav` entry for a
genuinely top-level concept, and keep `nav` and `sidebar` consistent. Don't invent a new group
without a reason.

---

## 6. Voice & style

Match `AGENTS.md` and the `.claude/reference/` files:

- Prescriptive and direct ("Run X", not "you might consider X"). Dense — cut filler.
- Present tense, active voice. Imperative mood for procedural steps.
- Avoid first/second person in reference content; use the imperative.
- Fenced code blocks with a language tag (`bash` for shell). Tables for multi-column reference
  data; prose for explanation.

---

## 7. Formatting (oxfmt) & markdown-it quirks

- oxfmt formats markdown automatically (lefthook pre-commit + `pnpm format`). Don't hand-format.
  It owns blank lines, fenced-block style, list indentation, and table alignment — write GFM
  pipe tables and let it align them. It does **not** reflow prose; keep prose lines ≤100 chars.
- VitePress uses markdown-it (stricter than GFM in places):
  - Custom containers (`:::tip`, `:::warning`, `:::danger`) are VitePress-specific. Use sparingly
    for genuinely important callouts, and confirm `pnpm format:check` is clean after adding one.
  - HTML comments (`<!-- … -->`) pass through invisibly (this is how the generated `todo.md`
    markers work). Footnotes/definition lists are not supported by default.

---

## 8. The generated TODO digest

`docs/todo.md` is **machine-owned**: `pnpm todos:generate` (run on commit via lefthook, checked
in CI by `pnpm todos:check`) harvests code annotations into the block between
`<!-- BEGIN GENERATED:annotations -->` and `<!-- END GENERATED:annotations -->`.

- **Never edit between the markers** — it's overwritten on the next commit. Fix the source
  comment instead.
- The frontmatter and the preamble **above** the opening marker are preserved across
  regenerations — safe to edit there.
- To change what the digest emits, edit `tooling/annotations/src/render.ts`, never `todo.md`.

---

## 9. Adding a page — checklist

Prefer `/scaffold-doc <slug> "<Title>" "<description>"`, which automates this. Manually:

1. Create `docs/<slug>.md` with frontmatter (`title`, `description`) and an `# H1`.
2. Write an orientation paragraph (leave a `<!-- TODO: … -->` rather than inventing content).
3. Register the page in `docs/.vitepress/config.ts` sidebar (and `nav` if top-level).
4. Run `pnpm docs:build` — confirm no dead links.
5. Run `pnpm format`.
