import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Cta } from "./cta";

describe("Cta", () => {
  it("renders the heading, description, and slotted action", () => {
    render(
      <Cta
        title="Ready to build?"
        description="Fork the template."
        actions={<button type="button">Start</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Ready to build?" })).toBeInTheDocument();
    expect(screen.getByText("Fork the template.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });
});
