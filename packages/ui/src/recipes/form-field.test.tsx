import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormField } from "./form-field";

describe("FormField", () => {
  it("associates the label, description, and error with the input", () => {
    render(
      <FormField
        id="email"
        label="Email"
        description="We never share it."
        error="Enter a valid email."
      />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-description email-error");
  });
});
