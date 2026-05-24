import { Project } from "ts-morph";
import { describe, expect, it } from "vitest";

import { extractVariants, inferRenderEnvironment } from "./infer";

function sourceFile(code: string) {
  return new Project({ useInMemoryFileSystem: true }).createSourceFile("component.tsx", code);
}

describe("inferRenderEnvironment", () => {
  it("detects a 'use client' directive", () => {
    expect(
      inferRenderEnvironment(sourceFile('"use client";\nexport function X() { return null; }')),
    ).toBe("client");
  });

  it("detects React hook imports", () => {
    expect(
      inferRenderEnvironment(
        sourceFile('import { useState } from "react";\nexport function X() { return null; }'),
      ),
    ).toBe("client");
  });

  it("defaults to server", () => {
    expect(inferRenderEnvironment(sourceFile("export function X() { return null; }"))).toBe(
      "server",
    );
  });
});

describe("extractVariants", () => {
  it("extracts CVA variant names, values, and defaults", () => {
    const code = `import { cva } from "class-variance-authority";
const v = cva("base", {
  variants: { intent: { primary: "a", ghost: "b" }, size: { sm: "s", lg: "l" } },
  defaultVariants: { intent: "primary" },
});`;
    expect(extractVariants(sourceFile(code))).toEqual([
      { name: "intent", values: ["primary", "ghost"], default: "primary" },
      { name: "size", values: ["sm", "lg"] },
    ]);
  });

  it("returns an empty list when there is no cva call", () => {
    expect(extractVariants(sourceFile("export const x = 1;"))).toEqual([]);
  });
});
