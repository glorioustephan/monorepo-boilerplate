import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../test-utils";
import { FeatureGrid } from "./FeatureGrid";

describe("FeatureGrid", () => {
  it("renders a card per feature", () => {
    renderWithTheme(
      <FeatureGrid
        features={[
          { title: "Fast", description: "Quick to build" },
          { title: "Safe", description: "Type-checked" },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Fast" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Safe" })).toBeInTheDocument();
    expect(screen.getByText("Quick to build")).toBeInTheDocument();
  });
});
