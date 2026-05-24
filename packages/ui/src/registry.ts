/**
 * Public catalog API: schema types + the generated component data + query
 * helpers. The data in `registry.generated.ts` is produced by
 * `tooling/catalog-extractor` (run `pnpm catalog:generate`) — never edit it by
 * hand. Author per-component metadata in `<name>.catalog.ts` sidecars instead.
 * This module is plain data (no React/CSS), safe to import from a Node process.
 */
import type { ComponentMeta, ComponentTier, RenderEnvironment } from "./catalog-schema";
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

export function filterByRenderEnvironment(
  renderEnvironment: RenderEnvironment,
): readonly ComponentMeta[] {
  return componentRegistry.filter((component) => component.renderEnvironment === renderEnvironment);
}

export interface ComponentSearchResult extends ComponentSummary {
  readonly renderEnvironment: RenderEnvironment;
  /** Relative lexical score; higher is a better match. Only positive scores are returned. */
  readonly score: number;
}

// Field weights for the lexical scorer. Name hits dominate; authored intent is a
// weak signal (it describes when to reach for a component, which is fuzzy).
const WEIGHT = {
  nameExact: 10,
  namePartial: 5,
  tier: 4,
  renderEnvironment: 3,
  description: 2,
  intent: 1,
} as const;

/**
 * Rank catalog components against a free-text query — in-memory, zero-dependency
 * lexical/structured scoring over name, tier, render environment, description, and
 * authored intent. Query is split into terms; each term contributes per matched
 * field. Returns matches sorted by score (then name); non-matches are dropped.
 */
export function searchComponents(query: string): readonly ComponentSearchResult[] {
  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results: ComponentSearchResult[] = [];
  for (const component of componentRegistry) {
    const name = component.name.toLowerCase();
    const tier = component.tier.toLowerCase();
    const renderEnvironment = component.renderEnvironment.toLowerCase();
    const description = component.description.toLowerCase();
    const intent = [...(component.intent?.use ?? []), ...(component.intent?.avoid ?? [])]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (name === term) score += WEIGHT.nameExact;
      else if (name.includes(term)) score += WEIGHT.namePartial;
      if (tier === term) score += WEIGHT.tier;
      if (renderEnvironment === term) score += WEIGHT.renderEnvironment;
      if (description.includes(term)) score += WEIGHT.description;
      if (intent.includes(term)) score += WEIGHT.intent;
    }

    if (score > 0) {
      results.push({
        name: component.name,
        description: component.description,
        tier: component.tier,
        renderEnvironment: component.renderEnvironment,
        score,
      });
    }
  }

  return results.toSorted((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
