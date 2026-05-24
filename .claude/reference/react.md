# React Conventions — @monorepo-boilerplate

React 19.2 + React Compiler 1.0 + RSC. Used in `apps/web` (Next.js 16) and `packages/ui` (Tailwind v4).
Enforced by oxlint with `react` + `react-hooks` + `jsx-a11y` plugins (`tooling/oxc-config/react.json`).

---

## 1. Component Basics

- **Function components only.** No classes.
- **Named exports** for all shared/UI components. Default export only for Next.js pages and layouts.
- **PascalCase** for component names and files (`UserCard.tsx`, not `userCard.tsx`).
- **Props as a typed object**, destructured in the signature:
  ```tsx
  type Props = { label: string; onClick: () => void };
  export function Button({ label, onClick }: Props) { ... }
  ```
  Prefer `type Props` for plain shape; use `interface Props` when extending or merging.
- **Keep components small and composable.** One concern per component; split when you feel the urge to comment a section.
- **Colocate** component, types, and styles in the same directory. Shared primitives live in `packages/ui/src`.
- `react/react-in-jsx-scope` is **OFF** — automatic JSX runtime is configured globally.

---

## 2. React Compiler 1.0

- The compiler **auto-memoizes** components and hook return values. Do **not** hand-write `useMemo`, `useCallback`, or `React.memo` for performance by default — it's redundant noise.
- Write **clear, idiomatic code** (pure renders, no prop/state mutation). Compiler safety depends on it.
- Rules of React must hold: renders must be pure; never mutate props or external state during render.
- `oxlint` rules-of-hooks catches violations statically; treat them as blocking errors.
- `"use no memo"` directive exists as an escape hatch for the rare case you must opt a component out of compiler output. Use it only with a comment explaining why.
- The `react-perf` "no new object/array/function/JSX as prop" rules are **disabled** (`tooling/oxc-config/react.json`): they exist to push manual memoization, which the Compiler makes redundant and which slot-prop composition (passing JSX/handlers as props) requires.

---

## 3. Server vs Client Components (RSC)

- **Default to Server Components.** No directive needed; the absence of `"use client"` means server.
- Add `"use client"` only when the component needs: `useState`, `useEffect`, event handlers, or browser APIs.
- **Keep `"use client"` at the leaves** of the tree — wrap only the interactive island, not its parent layout.
- Pass server-fetched data **down as props**; do not re-fetch in client components what a server parent can provide.
- Never import `server-only` modules (DB clients, env secrets) into client components. Use `import 'server-only'` guard in those modules.
- `packages/ui` components are presentational and must work in both environments. Add `"use client"` in `packages/ui` only when the component is inherently interactive (e.g. a controlled input, a tooltip with state).

---

## 4. Hooks

- **Rules of hooks:** call at the top level only — never inside conditionals, loops, or early returns. oxlint enforces this.
- **Custom hooks** must start with `use` (`useModal`, `useDebounce`). Extract whenever hook logic is reused or complex.
- **Effects are for syncing with external systems** (subscriptions, DOM APIs, third-party widgets) — not for deriving state.
  - Derive state during render: if a value can be computed from props/state, do it inline, not in `useEffect`.
  - Always return a cleanup function when the effect subscribes or allocates.
- Avoid `useEffect` for data fetching in Server Component trees; fetch in the server component instead.

---

## 5. State

- **Minimal state.** Derive everything derivable from existing state/props during render.
- **Lift state** only as high as the nearest common ancestor that needs it — no further.
- Use the **initializer function** form for expensive initial state: `useState(() => computeExpensive())`.
- **React 19 `use()`** — unwrap a promise or context value inside a component or custom hook; pairs with Suspense.
- **Forms and mutations:** prefer `useActionState` + Server Actions over manual fetch + `useState`. Use `useFormStatus` in submit-button children to reflect pending state.
  ```tsx
  const [state, action, isPending] = useActionState(serverAction, initialState);
  ```

---

## 6. Keys & Lists

- Keys must be **stable and unique** among siblings — use entity IDs, slugs, or stable identifiers.
- **Never use array index** as a key when the list can reorder, filter, or have items inserted/removed.

---

## 7. Composition over Configuration

- Prefer **`children` / slot props** over boolean flag explosions (`isLarge`, `hasIcon`, `isLoading` → compose instead).
- Use **`cn()`** (re-exported from `@monorepo-boilerplate/ui`) for conditional class merging.
- Use **`class-variance-authority` (CVA)** for variant logic. The `Button` component in `packages/ui/src/components/button.tsx` is the canonical pattern — follow it for any new variant-bearing primitive.
  ```tsx
  const variants = cva("base-classes", {
    variants: { intent: { primary: "...", ghost: "..." } },
    defaultVariants: { intent: "primary" },
  });
  ```
- Keep variant definitions co-located with the component, not in a separate constants file.

---

## 8. Accessibility

- Use **semantic HTML elements** (`<button>`, `<nav>`, `<main>`, `<article>`) before reaching for `<div>`.
- Every interactive control must have an accessible label: `<label>` + `htmlFor`, `aria-label`, or `aria-labelledby`.
- Avoid `onClick` on non-interactive elements; use `<button>` or `<a>` with appropriate `href`.
- `oxlint jsx-a11y` plugin is enabled and treated as blocking — fix all violations before merging.

---

See https://react.dev for authoritative API docs. Lint rules are in `tooling/oxc-config/react.json`.
