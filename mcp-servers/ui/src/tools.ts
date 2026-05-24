import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import {
  filterByRenderEnvironment,
  getComponent,
  listByTier,
  listComponents,
  searchComponents,
} from "@monorepo-boilerplate/ui/registry";
import { z } from "zod";

function json(data: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

/** `list_components` — names + descriptions of every kit component. */
export function listComponentsTool(): CallToolResult {
  return json(listComponents());
}

export const getComponentInputSchema = {
  name: z.string().min(1).describe("Component name, e.g. Button"),
};

/** `get_component` — full metadata (props, variants, example) for one component. */
export function getComponentTool({ name }: { name: string }): CallToolResult {
  const meta = getComponent(name);
  if (!meta) {
    return { content: [{ type: "text", text: `Unknown component: ${name}` }], isError: true };
  }
  return json(meta);
}

export const searchComponentsInputSchema = {
  query: z
    .string()
    .min(1)
    .describe("Free-text query, e.g. 'modal confirm dialog' or 'server-safe form input'"),
};

/** `search_components` — lexically ranked components matching a free-text query. */
export function searchComponentsTool({ query }: { query: string }): CallToolResult {
  return json(searchComponents(query));
}

const tierSchema = z.enum(["Primitive", "Recipe", "Block", "Template"]);

export const listByTierInputSchema = {
  tier: tierSchema.describe("Catalog tier to list"),
};

/** `list_by_tier` — every component in one taxonomy tier. */
export function listByTierTool({ tier }: { tier: z.infer<typeof tierSchema> }): CallToolResult {
  return json(listByTier(tier));
}

const renderEnvironmentSchema = z.enum(["server", "client", "universal"]);

export const filterByRenderEnvironmentInputSchema = {
  renderEnvironment: renderEnvironmentSchema.describe(
    "server (RSC-safe), client ('use client'), or universal",
  ),
};

/** `filter_by_render_environment` — components that render in the given environment. */
export function filterByRenderEnvironmentTool({
  renderEnvironment,
}: {
  renderEnvironment: z.infer<typeof renderEnvironmentSchema>;
}): CallToolResult {
  return json(filterByRenderEnvironment(renderEnvironment));
}
