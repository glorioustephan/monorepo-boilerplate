import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Inside</Card>);
    expect(screen.getByText("Inside")).toBeInTheDocument();
  });

  it("merges a caller className", () => {
    render(<Card className="custom-class">X</Card>);
    expect(screen.getByText("X")).toHaveClass("custom-class");
  });
});
