import { describe, expect, it } from "vitest";

import { getComponentTool, listComponentsTool } from "./tools";

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
});
