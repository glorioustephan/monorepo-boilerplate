import { describe, expect, it } from "vitest";

import {
  componentRegistry,
  filterByRenderEnvironment,
  getComponent,
  getComponentBySlug,
  listComponents,
  searchComponents,
  toSlug,
} from "./registry";

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

  it("every entry has an import path, a tier, an example path, and at least one example", () => {
    for (const meta of componentRegistry) {
      expect(meta.importPath).toBe("@monorepo-boilerplate/ui");
      expect(meta.tier.length).toBeGreaterThan(0);
      expect(meta.examplePath).toBe(`examples/${toSlug(meta.name)}.example.tsx`);
      expect(meta.examples.length).toBeGreaterThan(0);
    }
  });
});

describe("toSlug", () => {
  it("kebab-cases PascalCase component names", () => {
    expect(toSlug("Button")).toBe("button");
    expect(toSlug("ConfirmDialog")).toBe("confirm-dialog");
    expect(toSlug("FeatureGrid")).toBe("feature-grid");
    expect(toSlug("Cta")).toBe("cta");
  });
});

describe("getComponentBySlug", () => {
  it("resolves a component by its kebab-case slug", () => {
    expect(getComponentBySlug("confirm-dialog")?.name).toBe("ConfirmDialog");
    expect(getComponentBySlug("button")?.name).toBe("Button");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getComponentBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("searchComponents", () => {
  it("ranks a name match above a weaker intent-only match", () => {
    const results = searchComponents("confirm dialog");
    expect(results[0]?.name).toBe("ConfirmDialog");
    expect(results.map((r) => r.name)).toContain("Dialog");
  });

  it("ranks a tier-name query so that tier comes first", () => {
    const results = searchComponents("block");
    expect(results[0]?.tier).toBe("Block");
    const blockNames = results.filter((r) => r.tier === "Block").map((r) => r.name);
    expect(blockNames).toEqual(expect.arrayContaining(["Hero", "Cta", "FeatureGrid"]));
  });

  it("returns nothing for a blank or non-matching query", () => {
    expect(searchComponents("   ")).toHaveLength(0);
    expect(searchComponents("zzzzznotacomponent")).toHaveLength(0);
  });

  it("orders results by descending score", () => {
    const results = searchComponents("dialog");
    const scores = results.map((r) => r.score);
    expect(scores).toEqual([...scores].toSorted((a, b) => b - a));
  });
});

describe("filterByRenderEnvironment", () => {
  it("returns only components for the given environment", () => {
    expect(filterByRenderEnvironment("client").every((c) => c.renderEnvironment === "client")).toBe(
      true,
    );
    const serverNames = filterByRenderEnvironment("server").map((c) => c.name);
    expect(serverNames).toContain("Button");
    expect(serverNames).not.toContain("Dialog");
  });
});
