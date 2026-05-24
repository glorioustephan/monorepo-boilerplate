import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatureGrid } from "./feature-grid";

describe("FeatureGrid", () => {
  it("renders a card per feature", () => {
    render(
      <FeatureGrid
        features={[
          { title: "Fast", description: "Turbopack dev server." },
          { title: "Typed", description: "Strict TypeScript." },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Fast" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Typed" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
