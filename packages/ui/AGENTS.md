# UI kit — `@monorepo-boilerplate/ui`

The single, unified UI vocabulary, built on **Radix Themes** (`@radix-ui/themes`) and
**consumed from source** (exports point at `./src/*`) so consuming apps get HMR. The kit is
**the only package allowed to import Radix** — everything else imports from
`@monorepo-boilerplate/ui` (enforced by `pnpm lint:catalog`). See `.claude/reference/react.md`.

## Layers

Two axes: **tier** = origin/abstraction (the folder); **category** = function (Layout, Typography,
Forms, Data Display, Overlays, Navigation — drives Storybook nav + the catalog facet).

- **Components** (`src/components/<category>/`) — thin re-exports of **Radix Themes** components,
  **generated** from `src/components/components.manifest.ts` by `pnpm ui:codegen` and sub-foldered by
  category. Each gets a `<Name>.tsx` re-export and (for non-compound) a `<Name>.stories.tsx` matrix
  story. **Don't edit generated files** — edit the manifest and regenerate. Compound components
  (Dialog, Tabs, …) get a value-only re-export + a hand-authored story (the banner-safe prune keeps
  it). These are Radix Themes _components_, not `@radix-ui/primitives` (the unstyled lib we don't use).
- **Authored layers**, increasing scope, hand-built on those components: `src/recipes/` (compositions /
  UX patterns, incl. small ones like `Field`), `src/blocks/` (page sections), `src/templates/` (pages).
- **Theme layer** (`src/themes/`) — `ThemeProvider` (next-themes ⊃ Radix `<Theme>`),
  `useThemeControls`, `ThemeSwitcher`, custom accents (`accents.css`).

## Rules

- **Color comes from Radix props, never Tailwind classes.** Style through `color`/`variant`/
  `size`/`radius`/`highContrast` props + the active theme. Tailwind v4 is **layout/spacing only**
  on non-Radix elements — never color. No raw palette (`bg-red-600`), arbitrary colors
  (`bg-[#fff]`), or inline color styles. `pnpm lint:tokens` enforces this.
- **Add a component** by adding an entry to `components/components.manifest.ts` (name, category,
  renderEnv, usage, variant `axes`, `sample`/`sampleProps`, `compound`/`parts`) and running
  `pnpm ui:codegen` (`pnpm ui:codegen:check` gates drift in CI). Re-exports flow out via the
  generated `src/components/index.ts` → `src/index.ts`.
- **Add a composite** by hand (in `recipes/`/`blocks/`/`templates/`): one `<Name>.tsx` per file (PascalCase), composing components; named
  export re-exported from `src/index.ts`; merge any caller `className` with **`cn()`**. Ship the
  four files — `<Name>.tsx` + `examples/<Name>.example.tsx` + `<Name>.stories.tsx` (Default reuses
  the example) + `<Name>.test.tsx`. Add `"use client"` only when genuinely interactive.
- **Theming**: add a custom accent by defining its 12-step solid + alpha scales under
  `[data-accent-color="<name>"]` in `src/themes/accents.css` and adding the name to
  `ACCENT_COLORS` in `src/themes/theme-controls.ts`.
- **CSS setup** lives in the consuming **app**: `@import "tailwindcss"` → Radix
  `tokens.css`/`components.css`/`utilities.css` → `@monorepo-boilerplate/ui/styles.css` (which
  layers in `accents.css` + `@source`s the kit). Tailwind stays in the app so content detection
  roots there; don't move the `@source` paths.
- Tests: Vitest + Testing Library (`*.test.tsx`), jsdom. Render inside `<Theme>` via
  `renderWithTheme` (`src/test-utils.tsx`). Atoms are re-exports and don't get unit tests.
- **The catalog is not here.** `mcp-servers/ui` scrapes this kit (the manifest + composite source +
  stories) into its own database — the kit ships no catalog/registry files.
- **Storybook** lives here (`.storybook/`): `pnpm --filter @monorepo-boilerplate/ui storybook`.
  A global toolbar switches appearance/accent/gray/radius/scaling across all stories.
