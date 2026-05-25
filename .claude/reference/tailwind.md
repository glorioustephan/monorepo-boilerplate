# Radix Themes + Tailwind v4 (layout only)

How styling works in `@monorepo-boilerplate`. The UI kit is built on **Radix Themes**
(`@radix-ui/themes`); Tailwind v4 is kept **only for layout/spacing**. Read this before
styling a component.

---

## Setup (no config file)

Tailwind v4 is CSS-first — there is **no `tailwind.config.js`**.

- Apps own their Tailwind + Radix entry (`apps/web/src/app/globals.css`):
  ```css
  @import "tailwindcss";
  @import "@radix-ui/themes/tokens.css";
  @import "@radix-ui/themes/components.css";
  @import "@radix-ui/themes/utilities.css";
  @import "@monorepo-boilerplate/ui/styles.css";
  ```
  PostCSS via `@tailwindcss/postcss`. The Radix CSS is imported in the **app** (which declares
  `@radix-ui/themes` as a direct dependency) so it resolves under both `next build` (Turbopack)
  and `next dev` (PostCSS); importing it from inside the kit fails dev-mode resolution. Tailwind
  stays in the app so its **content detection roots at the app**.
- `packages/ui/src/styles.css` then layers in the kit's `accents.css` and `@source`s the kit
  (`./components`, `./blocks`, `./recipes`, `./themes`). `@source` paths are relative to the CSS
  file that declares them (a common v4 footgun) — don't move them.
- **Cascade:** Radix Themes ships **unlayered** CSS; Tailwind v4 puts everything in `@layer`.
  Unlayered beats layered, so Radix always wins where both target the same element/property.
  That's intentional: Radix owns component appearance; Tailwind only positions things.

## Color comes from Radix, not classes

Set color/emphasis through Radix Themes **props**, never Tailwind color utilities:

- `color` — accent or any palette color (`"blue"`, `"red"`, `"gray"`, the custom `"brand"`, …).
- `variant` — `solid` | `soft` | `surface` | `outline` | `ghost` (component-dependent).
- `size` — `"1"`–`"4"` (component-dependent).
- `radius` — `none` | `small` | `medium` | `large` | `full` (overrides the theme default).
- `highContrast` — boolean, bumps contrast.

Banned in hand-written code: raw palette (`bg-red-600`), arbitrary colors (`bg-[#fff]`,
`text-[oklch(...)]`), inline color styles. Enforced by `pnpm lint:tokens` (pre-commit + CI +
a `.claude` PostToolUse advisory hook).

Tailwind is allowed **only** for layout/spacing on non-Radix elements — `flex`, `grid`, `gap-*`,
`p-*`, `m-*`, `w-*`, `h-*`, `max-w-*`, etc. Prefer Radix layout primitives (`Box`, `Flex`,
`Grid`, `Container`, `Section`) where they fit; reach for Tailwind only for one-off positioning.

## Theming

`src/themes/theme-provider.tsx` composes **`next-themes`** (owns light/dark `appearance` via the
`class` attribute) _outside_ Radix `<Theme>`, which receives `accentColor` / `grayColor` /
`radius` / `scaling` / `panelBackground` from `useThemeControls()`. Wrap the app once near the
root (`apps/web/src/app/layout.tsx`, with `suppressHydrationWarning` on `<html>`); nest `<Theme>`
to override a subtree.

Switch themes at runtime with the kit `ThemeSwitcher` (or `useThemeControls()`); selections
persist to `localStorage`. Storybook exposes the same axes via its global toolbar.

## Adding a custom accent color

1. Define the 12-step solid scale (`--accent-1..12`), 12-step alpha scale (`--accent-a1..12`),
   and the functional tokens (`--accent-contrast`, `--accent-surface`, `--accent-indicator`,
   `--accent-track`) under `[data-accent-color="<name>"]` (and a dark-mode variant) in
   `src/themes/accents.css`. See the `"brand"` example.
2. Add `"<name>"` to `ACCENT_COLORS` in `src/themes/theme-controls.ts` so it appears in the
   switcher and the Storybook toolbar.

## Layers (two axes: tier × category)

- **Components** (`packages/ui/src/components/<category>/`, PascalCase) — thin re-exports of Radix
  Themes components, **generated** from `components/components.manifest.ts` via `pnpm ui:codegen`
  (re-export + matrix story per component, sub-foldered by category). Add a component = add a
  manifest entry + regenerate; never hand-edit generated files.
- **Composites** (authored, increasing scope): `recipes/` (UX patterns like `Field`/`ConfirmDialog`),
  `blocks/` (page sections), `templates/` (pages). Each ships `<Name>.tsx` +
  `examples/<Name>.example.tsx` + `<Name>.stories.tsx` + `<Name>.test.tsx`, composing the components
  above; merge any caller `className` with `cn()`.

The component catalog (search/retrieval for agents) is **owned by `mcp-servers/ui`**, which scrapes
the kit — `packages/ui` ships no catalog files.
