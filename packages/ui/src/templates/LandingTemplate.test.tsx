import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../test-utils";
import { LandingTemplate } from "./LandingTemplate";

describe("LandingTemplate", () => {
  it("renders the hero title, features, and cta", () => {
    renderWithTheme(
      <LandingTemplate
        title="Welcome"
        features={[{ title: "Fast", description: "Quick" }]}
        cta={{ title: "Join now" }}
      />,
    );
    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fast" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Join now" })).toBeInTheDocument();
  });
});
