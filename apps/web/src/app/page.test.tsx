import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the greeting and the UI-kit button", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /hello, monorepo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Get started" })).toBeInTheDocument();
  });
});
