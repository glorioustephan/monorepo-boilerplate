# UI kit — `@monorepo-boilerplate/ui`

Tailwind v4 component kit, **consumed from source** (exports point at `./src/*`) so
consuming apps get HMR. See `.claude/reference/react.md` for component conventions.

## Rules

- Components are **presentational and runtime-agnostic** — no `"use client"` unless a
  component is genuinely interactive (state/effects/handlers). Most primitives work in
  both Server and Client Components.
- One component per file in `src/components/`, named export, re-exported from `src/index.ts`.
- Variants via **`class-variance-authority`**; merge classes with **`cn()`** (`src/lib/cn.ts`).
  Match `src/components/button.tsx` — it's the canonical pattern.
- Style with **semantic token classes only** — never raw palette (`bg-red-600`), arbitrary
  values (`bg-[#fff]`), or inline color styles. `pnpm lint:tokens` (+ a pre-commit hook) enforces
  this. Full contract + theming rules: `.claude/reference/tailwind.md`. Token roles:
  `bg-background`/`text-foreground` (page), `bg-surface`/`text-surface-foreground` (cards/panels),
  `bg-primary`/`text-primary-foreground`, `bg-muted`/`text-muted-foreground`,
  `bg-destructive`/`text-destructive-foreground`, `border-border`, `ring-ring` (focus),
  radius `rounded-sm|md|lg`. The bare color token as ink on a neutral background is also
  allowed — `text-destructive` (error/validation text), `text-primary` (brand text/icons).
- **Theming**: tokens are CSS variables mapped via `@theme inline` in `src/themes/default.css`.
  Add a theme as `src/themes/<name>.css` scoped to `[data-theme="<name>"]`; apps opt in by
  importing `@monorepo-boilerplate/ui/themes/<name>` and setting `data-theme`. `.dark` toggles dark mode.
- `src/styles.css` carries tokens + `@source "./components"` so Tailwind scans the kit from
  any consumer. Don't move that `@source` — its relative path is what makes cross-app scanning work.
- Tests: Vitest + Testing Library (`*.test.tsx`), jsdom via the `reactPreset`.
- **Registry**: when you add a component, also add an entry to `src/registry.ts` (plain,
  machine-readable metadata) — `mcp-servers/ui` surfaces it to agents via MCP.
