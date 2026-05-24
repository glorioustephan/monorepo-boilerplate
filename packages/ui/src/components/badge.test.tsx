import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its children inside a span", () => {
    render(<Badge>Beta</Badge>);
    expect(screen.getByText("Beta").tagName).toBe("SPAN");
  });

  it("applies the muted variant classes", () => {
    render(<Badge variant="muted">Muted</Badge>);
    expect(screen.getByText("Muted")).toHaveClass("bg-muted");
  });

  it("forwards arbitrary span attributes", () => {
    render(<Badge data-testid="badge-1">Live</Badge>);
    expect(screen.getByTestId("badge-1")).toHaveTextContent("Live");
  });
});
