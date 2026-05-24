import { describe, expect, it } from "vitest";

import {
  componentRegistry,
  getComponent,
  getComponentBySlug,
  listComponents,
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
