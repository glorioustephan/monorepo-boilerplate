---
name: add-ui-component
description: Add a new component to the @monorepo-boilerplate/ui kit following its conventions (CVA variants, cn(), semantic tokens, source export, Vitest test). Use when creating or scaffolding a shared UI component, button, card, input, or other design-system primitive.
---

# Add a UI component

Add a component to `packages/ui` matching the kit's conventions. The canonical
reference is `packages/ui/src/components/button.tsx`. Also read
`.claude/reference/react.md` and `packages/ui/AGENTS.md`.

## Steps

1. **Create `packages/ui/src/components/<name>.tsx`**:
   - Named export, PascalCase component, props as a typed object destructured in the signature.
   - Extend the right DOM props type with **`ComponentPropsWithRef<"button">`** (etc.) — this
     accepts a `ref` (React 19 passes it as a normal prop; no `forwardRef` needed) and is spread
     onto the element, so consumers can integrate with form libs, focus, and Radix.
   - For variants, use `class-variance-authority`; merge classes with `cn()` from `../lib/cn`.
     If the look should be reusable on other elements, **export the `cva` generator** (like
     `buttonVariants`) so a `<Link>` can adopt it without duplicating classes.
   - Style only with **semantic token classes** (`bg-primary`, `text-foreground`,
     `border-border`, …) — never hard-coded colors.
   - **Accessibility**: include a visible `focus-visible` ring with offset; inputs need an
     associated label (`htmlFor`/`aria-label`), not a placeholder; prefer semantic elements
     (a label pill is a `<span>`, not a `<div>`).
   - Add `"use client"` ONLY if the component is interactive (state/effects/handlers) — i.e. it
     uses `useState`/`useEffect`/event handlers/browser APIs.
2. **Export it** from `packages/ui/src/index.ts` (the component, its props type, and any exported
   `cva` variant generator).
3. **Add an entry to `packages/ui/src/registry.ts`** — `name`, `description`, `importPath`,
   `sourcePath`, `props`, `variants` (if any), and a runnable `example`. This is how
   `apps/ui-mcp-server` surfaces the component to agents; skipping it makes the component invisible.
4. **Add a test** `packages/ui/src/components/<name>.test.tsx` using Testing Library
   (`render` + `screen`, jsdom via the react preset). Cover render, one variant, `className`
   merge, and (for interactive/ref'd components) ref forwarding.
5. **Verify**: `pnpm --filter @monorepo-boilerplate/ui test` and `pnpm typecheck && pnpm lint`.

## Notes

- New design tokens go in `packages/ui/src/themes/default.css` (and other theme files),
  mapped through `@theme inline`. Don't introduce raw colors in component classes.
- The component is consumed from source, so it hot-reloads in `apps/web` immediately —
  no build or version bump needed.
