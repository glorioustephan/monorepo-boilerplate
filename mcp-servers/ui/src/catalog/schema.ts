/**
 * Catalog record shape — what the MCP server stores and serves. Built from the UI
 * kit's atom manifest (and, later, scraped composites) at build time into a
 * node:sqlite database; queried at runtime. Owned by the MCP server, not the kit.
 */

export const TIERS = ["Component", "Recipe", "Block", "Template"] as const;
export type Tier = (typeof TIERS)[number];

export const RENDER_ENVS = ["server", "client", "universal"] as const;
export type RenderEnv = (typeof RENDER_ENVS)[number];

export interface ComponentVariant {
  readonly prop: string;
  readonly values: readonly string[];
}

export interface ComponentRecord {
  readonly name: string;
  readonly tier: Tier;
  readonly category: string;
  readonly renderEnv: RenderEnv;
  readonly description: string;
  readonly variants?: readonly ComponentVariant[];
  /** Compound sub-parts (e.g. `["Root","Trigger","Content"]`). */
  readonly parts?: readonly string[];
  /** Verbatim source of the component's reference story/example (the runnable ground truth). */
  readonly example?: string;
}

/** A lightweight listing item (no example/source) for `list_components`. */
export interface ComponentSummary {
  readonly name: string;
  readonly tier: Tier;
  readonly description: string;
}
