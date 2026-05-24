# TypeScript Style Guide

Canonical TypeScript rules for `@monorepo-boilerplate`. Adapts [ts.dev/style](https://ts.dev/style/) for our
ESM + bundler + Next.js 16 / React 19 monorepo. Read the adaptations section — several ts.dev defaults are
overridden here.

---

## Formatting & Linting

Formatting is owned by **oxfmt** (`.oxfmtrc.json`): quotes, semicolons, line width (100), trailing commas —
do not restate those rules here. Lint is **oxlint** (`tooling/oxc-config/`); rules marked _(enforced)_ are
caught automatically.

---

## Naming

- **lowerCamelCase** — variables, functions, methods, properties, parameters.
- **UpperCamelCase** — classes, types, interfaces, enums, enum members, React components.
- **CONSTANT_CASE** — module-level `const` values that are deeply immutable and semantically constant.
- **Acronyms are words.** Write `loadHttpUrl`, `parseJson`, `XmlParser` — not `loadHTTPURL`, `parseJSON`.
- Avoid single-letter names outside short-lived loop indices or well-known math (`i`, `x`, `n`).
- Boolean variables/props: use `is`/`has`/`can` prefix (`isLoading`, `hasError`).
- File naming: **kebab-case** for modules (`user-service.ts`), PascalCase acceptable for component files
  (`UserCard.tsx`). Framework files follow their required name (`page.tsx`, `layout.tsx`).

---

## Variables & Functions

- Prefer `const`. Use `let` only when reassignment is required. **Never `var`.** _(enforced)_
- Prefer arrow functions for expressions and callbacks; use `function` declarations for hoisted, named
  top-level functions.
- Keep functions small and single-purpose. Prefer explicit return types on all exported functions.
- Use `===` for equality. Exception: `== null` is acceptable to test for both `null` and `undefined`.
- Prefer `for...of` over indexed `for` loops unless the index is actually needed.
- Avoid side effects at module top-level beyond `const` initialisers.

---

## Types & Interfaces

- **Prefer `interface`** for object shapes that may be extended or implemented (declaration merging, OOP).
- **Use `type`** for unions, intersections, tuples, mapped types, and aliases that are not object shapes.
  ```ts
  interface UserProfile {
    id: UserId;
    name: string;
  }
  type Result<T> = { ok: true; value: T } | { ok: false; error: string };
  ```
- **`T[]` for simple types; `Array<T>` for complex/long type expressions.**
  ```ts
  string[]              // simple — preferred
  Array<string | null>  // complex — preferred
  ```
- Use `readonly` on properties and parameters that must not be mutated after construction.
- Use `as const` for literal objects/arrays whose types should narrow to literals.
- Use discriminated unions over class hierarchies for state modelling. Include an exhaustive `never` check
  in switch/if-else over the discriminant.
- **Branded types** for domain identifiers that must not be interchanged:
  ```ts
  type UserId = string & { readonly __brand: "UserId" };
  ```
- Avoid `enum`; prefer `as const` objects or string literal unions. Numeric enums are banned. _(enforced)_
- No `namespace` or `module` declarations. _(enforced)_

---

## Null, Undefined & Optionals

- `undefined` is the idiomatic absent value in TypeScript. Reserve `null` for values that must round-trip
  through JSON or interop with nullable APIs.
- Avoid optional chaining deep chains that hide missing data — narrow explicitly when the shape matters.
- `noUncheckedIndexedAccess` is **on**: all array/object index access yields `T | undefined`. Guard before use.
  ```ts
  const first = arr[0]; // type: string | undefined — must narrow
  ```
- Do not use optional parameters (`param?: T`) when the caller must always provide a value. Optionals are
  for genuinely omittable arguments.

---

## `any`, `unknown` & Type Assertions

- **Never use `any` in new code.** Use `unknown` for untrusted input, then narrow with type guards. _(enforced for explicit `any`)_
  ```ts
  function parse(raw: unknown): User {
    if (!isUser(raw)) throw new Error("invalid");
    return raw;
  }
  ```
- `as` assertions: allowed only when you have information the compiler lacks (e.g., after a runtime check,
  DOM query, or cast from an opaque external type). Add a short inline comment explaining why.
- Non-null assertion `!` — avoid. Prefer explicit narrowing or restructuring. If unavoidable (framework
  interop), add a comment.
- `@ts-ignore` and `@ts-expect-error` — `@ts-ignore` is banned. _(enforced)_ Use `@ts-expect-error` with
  a description comment, and only when no type-correct alternative exists.

---

## Imports & Exports

### Adaptations for this repo

The following override ts.dev rules that predate isolatedModules/bundlers:

1. **`import type` is required for type-only imports.**
   `verbatimModuleSyntax: true` is set in tsconfig; oxlint enforces `consistent-type-imports` with inline
   type syntax. This **directly overrides** ts.dev's old "do not use import type" guidance.

   ```ts
   import { type User, fetchUser } from "./user-service"; // correct
   import type { User } from "./user-service"; // also fine for type-only files
   ```

2. **Default exports are allowed where the framework requires them.**
   Next.js `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `next.config.ts`,
   and config files (`vitest.config.ts`, `playwright.config.ts`, `tsdown.config.ts`) **must** use a
   default export. Note `route.ts` (named `GET`/`POST`/…) and `proxy.ts` (named `proxy` + `config`)
   use **named** exports. Everywhere else, **named exports are the default.**

3. **No barrel `index.ts` re-exports** inside packages unless the package's public API is intentionally
   bounded. Barrels defeat tree-shaking and slow bundler resolution.

### General import rules

- Group imports: external packages → internal workspace packages → relative. Blank line between groups.
  oxlint enforces import ordering. _(enforced)_
- Use absolute workspace imports (`@repo/ui`) over relative paths that cross package boundaries.
- No `require()` calls in TypeScript source. _(enforced)_

---

## Comments & JSDoc

- Every **exported symbol** (function, class, type, constant) gets a JSDoc comment.
- JSDoc for functions: describe _what_ and _why_, not _how_. Document params only when their role is
  non-obvious — do not restate the type the signature already expresses.
  ```ts
  /** Returns a stable hash of the user's email for avatar URL generation. */
  export function gravatarHash(email: string): string { … }
  ```
- Use `/** */` for JSDoc, `//` for inline implementation notes. Avoid `/* */` block comments.
- Avoid `TODO(username)` without a linked issue. Prefer `// TODO(#123): …`.
- Do not comment out code — delete it. Version control preserves history.

---

## Miscellaneous

- `noImplicitOverride` is **on**: use the `override` keyword on subclass methods.
- `noUnusedLocals` and `noUnusedParameters` are **on** — remove unused declarations. _(enforced)_
- Prefer `structuredClone` over manual spread for deep cloning.
- Prefer `Error` subclasses with a descriptive name over plain `new Error("...")` for thrown errors.
- Avoid `arguments`; use rest parameters (`...args`).
- Do not use `Function`, `Object`, or `String` (capital) as types. _(enforced)_
- Use `satisfies` to validate a value against a type without widening it:
  ```ts
  const config = { port: 3000, host: "localhost" } satisfies ServerConfig;
  ```

---

Deeper rationale: <https://ts.dev/style/> — Lint rules: `tooling/oxc-config/base.json`
