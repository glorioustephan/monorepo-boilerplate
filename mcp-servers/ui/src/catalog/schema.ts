/**
 * Catalog record shape — what the MCP server stores and serves. Built from the UI
 * kit's component manifest + authored composites at build time into a node:sqlite
 * database; queried at runtime. Owned by the MCP server, not the kit.
 */
import { z } from 'zod';

export const TIERS = ['Component', 'Recipe', 'Block', 'Template'] as const;
export type Tier = (typeof TIERS)[number];

export const RENDER_ENVS = ['server', 'client', 'universal'] as const;
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

/** Runtime validator for a row's JSON `data` column — fails loudly on schema drift. */
export const componentRecordSchema = z.object({
  name: z.string(),
  tier: z.enum(TIERS),
  category: z.string(),
  renderEnv: z.enum(RENDER_ENVS),
  description: z.string(),
  variants: z.array(z.object({ prop: z.string(), values: z.array(z.string()) })).optional(),
  parts: z.array(z.string()).optional(),
  example: z.string().optional(),
});

/** Schema for `list_components` summaries (drives the tool's `outputSchema`). */
export const componentSummarySchema = z.object({
  name: z.string(),
  tier: z.enum(TIERS),
  description: z.string(),
});
