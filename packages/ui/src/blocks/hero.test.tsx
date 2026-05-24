import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "./hero";

describe("Hero", () => {
  it("renders the heading and slotted actions", () => {
    render(<Hero title="Ship faster" actions={<button type="button">Start</button>} />);
    expect(screen.getByRole("heading", { name: "Ship faster" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });
});
