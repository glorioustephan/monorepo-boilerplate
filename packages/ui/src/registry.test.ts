import { describe, expect, it } from "vitest";

import { componentRegistry, getComponent, listComponents } from "./registry";

describe("component registry", () => {
  it("lists every component with a tier", () => {
    const names = listComponents().map((c) => c.name);
    expect(names).toContain("Button");
    expect(listComponents().every((c) => c.tier.length > 0)).toBe(true);
  });

  it("looks up a component case-insensitively", () => {
    expect(getComponent("button")?.name).toBe("Button");
    expect(getComponent("MISSING")).toBeUndefined();
  });

  it("every entry has an import path, a tier, and at least one example", () => {
    for (const meta of componentRegistry) {
      expect(meta.importPath).toBe("@monorepo-boilerplate/ui");
      expect(meta.tier.length).toBeGreaterThan(0);
      expect(meta.examples.length).toBeGreaterThan(0);
    }
  });
});
