# Tailwind v4 + Token Contract

How styling works in `@monorepo-boilerplate`. Tailwind v4 is **CSS-first** — there is
**no `tailwind.config.js`**. Read this before styling a component.

---

## Setup (no config file)

- Apps own their Tailwind entry (`apps/web/src/app/globals.css`): `@import "tailwindcss";`
  then `@import "@monorepo-boilerplate/ui/styles.css";`. PostCSS via `@tailwindcss/postcss`.
- `packages/ui/src/styles.css` is a **carrier, not an entry**: it ships the tokens and a
  `@source "./components"` so the kit's utility classes are always generated. `@source` paths
  are relative to the CSS file that declares them (a common v4 footgun).

## Semantic token contract

Style with these token utilities only. Never raw palette (`bg-red-600`), arbitrary values
(`bg-[#fff]`, `text-[oklch(...)]`), or inline color styles. Enforced by `pnpm lint:tokens`
(pre-commit + CI + a `.claude` PostToolUse advisory hook).

| Utility                                          | Use                                                          |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `bg-background` / `text-foreground`              | Page / root surface                                          |
| `bg-surface` / `text-surface-foreground`         | Cards, panels, elevated containers                           |
| `bg-primary` / `text-primary-foreground`         | Brand action surfaces                                        |
| `bg-muted` / `text-muted-foreground`             | Subtle hover/disabled surfaces; secondary text               |
| `bg-destructive` / `text-destructive-foreground` | Error/danger actions                                         |
| `border-border`                                  | All borders and dividers                                     |
| `ring-ring`                                      | Focus rings (`focus-visible:ring-2 focus-visible:ring-ring`) |
| `rounded-sm` / `rounded-md` / `rounded-lg`       | Radius scale                                                 |

## Adding a token

1. Add the raw CSS variable to `:root` (and `.dark`) in `src/themes/default.css`.
2. Map it in the `@theme inline` block there (`--color-x: var(--x)`). Use a **distinct** raw
   var name to avoid self-reference (radius uses `--rad-*` → `--radius-*`).
3. Update the contract table above + `packages/ui/AGENTS.md`.

## Adding a theme

1. Create `src/themes/<name>.css`. Override only the raw variables that differ.
2. **Do not** repeat the `@theme inline` block — it lives only in `default.css`.
3. Include both light (`[data-theme="<name>"]`) and dark
   (`.dark[data-theme="<name>"], [data-theme="<name>"] .dark`) selectors (see `emerald.css`).
4. Apps opt in: `@import "@monorepo-boilerplate/ui/themes/<name>";` + `data-theme="<name>"` on a root.

## CVA conventions

- Variant class strings contain **only** semantic token utilities; `size` uses the Tailwind
  spacing/typography scale (no arbitrary values).
- Base classes put focus on `focus-visible:ring-ring`.
- Export the `xVariants` CVA fn (e.g. `buttonVariants`) so non-component elements (a `<Link>`)
  can adopt the look without duplicating classes. `src/components/button.tsx` is canonical.
