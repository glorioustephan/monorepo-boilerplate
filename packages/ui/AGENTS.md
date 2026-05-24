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
- Style with **semantic token classes** (`bg-background`, `text-foreground`, `bg-primary`,
  `border-border`) — never hard-coded colors. Tokens are defined in `src/themes/`.
- **Theming**: tokens are CSS variables mapped via `@theme inline` in `src/themes/default.css`.
  Add a theme as `src/themes/<name>.css` scoped to `[data-theme="<name>"]`; apps opt in by
  importing `@monorepo-boilerplate/ui/themes/<name>` and setting `data-theme`. `.dark` toggles dark mode.
- `src/styles.css` carries tokens + `@source "./components"` so Tailwind scans the kit from
  any consumer. Don't move that `@source` — its relative path is what makes cross-app scanning work.
- Tests: Vitest + Testing Library (`*.test.tsx`), jsdom via the `reactPreset`.
