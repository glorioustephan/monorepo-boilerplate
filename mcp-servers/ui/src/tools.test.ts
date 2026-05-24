import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { describe, expect, it } from "vitest";

import {
  filterByRenderEnvironmentTool,
  getComponentTool,
  listByTierTool,
  listComponentsTool,
  searchComponentsTool,
} from "./tools";

/** Parse the JSON array a tool serializes into its single text content block. */
function parseResults(result: CallToolResult): Array<{ name: string }> {
  const block = result.content[0];
  if (!block || block.type !== "text") throw new Error("expected a text content block");
  return JSON.parse(block.text) as Array<{ name: string }>;
}

describe("ui-mcp tools", () => {
  it("list_components includes Button", () => {
    expect(JSON.stringify(listComponentsTool().content)).toContain("Button");
  });

  it("get_component returns metadata for a known component", () => {
    const result = getComponentTool({ name: "Button" });
    expect(result.isError).toBeUndefined();
    expect(JSON.stringify(result.content)).toContain("variant");
  });

  it("get_component flags an unknown component", () => {
    const result = getComponentTool({ name: "Nope" });
    expect(result.isError).toBe(true);
  });

  it("search_components ranks the strongest match first", () => {
    const results = parseResults(searchComponentsTool({ query: "confirm dialog" }));
    expect(results[0]?.name).toBe("ConfirmDialog");
    expect(results.map((r) => r.name)).toContain("Dialog");
  });

  it("list_by_tier returns only that tier", () => {
    const names = parseResults(listByTierTool({ tier: "Block" })).map((r) => r.name);
    expect(names).toEqual(expect.arrayContaining(["Hero", "Cta", "FeatureGrid"]));
    expect(names).not.toContain("Button");
  });

  it("filter_by_render_environment returns only matching components", () => {
    const names = parseResults(filterByRenderEnvironmentTool({ renderEnvironment: "client" })).map(
      (r) => r.name,
    );
    expect(names).toEqual(expect.arrayContaining(["Dialog", "Select", "Tooltip"]));
    expect(names).not.toContain("Button");
  });
});
