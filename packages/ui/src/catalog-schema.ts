/**
 * Component catalog schema. Pure types — no imports from the generated registry,
 * so it can be a leaf module (no import cycle). The MCP server and the catalog
 * extractor both depend on these shapes.
 */

/**
 * Tier in the component taxonomy, in display/sort order:
 * - Primitive — a single styled element or Radix wrapper (Button, Input, Dialog).
 * - Recipe    — a composition of primitives solving one UX pattern (ConfirmDialog).
 * - Block      — a page-level section, server-first with slot props (Hero, CTA).
 * - Template  — a full page assembled from blocks (lives in apps as an example).
 *
 * The const tuple is the single source of truth: types, zod enums (MCP tools), and
 * the extractor's tier sort all derive from it, so they cannot drift.
 */
export const COMPONENT_TIERS = ["Primitive", "Recipe", "Block", "Template"] as const;
export type ComponentTier = (typeof COMPONENT_TIERS)[number];

/**
 * Where a component may render (single source of truth — see {@link COMPONENT_TIERS}):
 * - server    — no `"use client"`, no hooks/browser APIs; safe in RSC.
 * - client    — requires `"use client"` (hooks, handlers, browser APIs, Radix).
 * - universal — works in both; authored on the sidecar (the extractor only infers
 *   server/client — it cannot prove a component is environment-agnostic).
 */
export const RENDER_ENVIRONMENTS = ["server", "client", "universal"] as const;
export type RenderEnvironment = (typeof RENDER_ENVIRONMENTS)[number];

/** A single prop in a component's public API, as surfaced to agents. */
export interface ComponentProp {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly default?: string;
  readonly description?: string;
}

/** A CVA variant axis (e.g. `variant`/`size`) with its allowed values and default. */
export interface ComponentVariant {
  readonly name: string;
  readonly values: readonly string[];
  readonly default?: string;
}

/** A labelled, runnable usage snippet for a component. */
export interface ComponentExample {
  readonly label: string;
  readonly code: string;
}

/** Authored guidance the extractor cannot infer — helps agents choose well. */
export interface ComponentIntent {
  readonly use: readonly string[];
  readonly avoid: readonly string[];
}

/** The full, machine-readable record for one catalogued component (generated). */
export interface ComponentMeta {
  readonly name: string;
  readonly description: string;
  readonly importPath: string;
  readonly sourcePath: string;
  /** Path (relative to the kit root) of the live `*.example.tsx` ground truth. */
  readonly examplePath: string;
  readonly tier: ComponentTier;
  readonly renderEnvironment: RenderEnvironment;
  readonly props: readonly ComponentProp[];
  readonly variants?: readonly ComponentVariant[];
  readonly examples: readonly ComponentExample[];
  readonly intent?: ComponentIntent;
}

/**
 * The URL/file slug for a component: PascalCase → kebab-case
 * (`ConfirmDialog` → `confirm-dialog`, `FeatureGrid` → `feature-grid`). Shared by
 * the extractor (to locate the example file) and the registry (to look up by slug),
 * so both agree on one mapping.
 */
export function toSlug(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Hand-authored metadata, co-located with a component as `<name>.catalog.ts`
 * (exported as `meta`). The extractor merges this with values it infers from
 * source (`renderEnvironment`, `variants`) to produce `registry.generated.ts`.
 */
export interface CatalogSidecar {
  readonly name: string;
  readonly tier: ComponentTier;
  readonly description: string;
  readonly props: readonly ComponentProp[];
  readonly examples: readonly ComponentExample[];
  readonly intent?: ComponentIntent;
  /**
   * Override the inferred render environment. The extractor only infers
   * `server`/`client` from source; set `"universal"` here for a component that is
   * deliberately environment-agnostic.
   */
  readonly renderEnvironment?: RenderEnvironment;
}
