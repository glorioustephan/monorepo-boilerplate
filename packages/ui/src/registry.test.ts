import { describe, expect, it } from "vitest";

import { componentRegistry, getComponent, listComponents } from "./registry";

describe("component registry", () => {
  it("lists every component name + description", () => {
    expect(listComponents().map((c) => c.name)).toEqual(["Button", "Card", "Input", "Badge"]);
  });

  it("looks up a component case-insensitively", () => {
    expect(getComponent("button")?.name).toBe("Button");
    expect(getComponent("MISSING")).toBeUndefined();
  });

  it("every entry has an import path and example", () => {
    for (const meta of componentRegistry) {
      expect(meta.importPath).toBe("@monorepo-boilerplate/ui");
      expect(meta.example.length).toBeGreaterThan(0);
    }
  });
});
