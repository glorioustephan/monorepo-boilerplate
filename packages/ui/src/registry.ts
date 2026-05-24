/**
 * Public catalog API: schema types + the generated component data + query
 * helpers. The data in `registry.generated.ts` is produced by
 * `tooling/catalog-extractor` (run `pnpm catalog:generate`) — never edit it by
 * hand. Author per-component metadata in `<name>.catalog.ts` sidecars instead.
 * This module is plain data (no React/CSS), safe to import from a Node process.
 */
import type { ComponentMeta, ComponentTier } from "./catalog-schema";
import { toSlug } from "./catalog-schema";
import { componentRegistry } from "./registry.generated";

export type {
  CatalogSidecar,
  ComponentExample,
  ComponentIntent,
  ComponentMeta,
  ComponentProp,
  ComponentTier,
  ComponentVariant,
  RenderEnvironment,
} from "./catalog-schema";

export { componentRegistry, toSlug };

export interface ComponentSummary {
  readonly name: string;
  readonly description: string;
  readonly tier: ComponentTier;
}

export function listComponents(): readonly ComponentSummary[] {
  return componentRegistry.map(({ name, description, tier }) => ({ name, description, tier }));
}

export function getComponent(name: string): ComponentMeta | undefined {
  const target = name.toLowerCase();
  return componentRegistry.find((component) => component.name.toLowerCase() === target);
}

/** Look up a component by its kebab-case slug (`confirm-dialog`) — used by the example route. */
export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return componentRegistry.find((component) => toSlug(component.name) === slug);
}

export function listByTier(tier: ComponentTier): readonly ComponentMeta[] {
  return componentRegistry.filter((component) => component.tier === tier);
}
