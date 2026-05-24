import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { getComponent, listComponents } from "@monorepo-boilerplate/ui/registry";
import { z } from "zod";

/** `list_components` — names + descriptions of every kit component. */
export function listComponentsTool(): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(listComponents(), null, 2) }] };
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
  return { content: [{ type: "text", text: JSON.stringify(meta, null, 2) }] };
}
