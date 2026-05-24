import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../components/button";
import { ConfirmDialog } from "./confirm-dialog";

describe("ConfirmDialog", () => {
  it("renders its trigger (content is portalled on open)", () => {
    render(
      <ConfirmDialog trigger={<Button>Delete</Button>} title="Delete?" onConfirm={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
