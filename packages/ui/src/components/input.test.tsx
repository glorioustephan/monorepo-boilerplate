import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("associates with a label via id/htmlFor", () => {
    render(
      <label htmlFor="email">
        Email
        <Input id="email" type="email" />
      </label>,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("passes through value and disabled", () => {
    render(<Input aria-label="name" defaultValue="Ada" disabled />);
    const input = screen.getByLabelText("name");
    expect(input).toHaveValue("Ada");
    expect(input).toBeDisabled();
  });
});
