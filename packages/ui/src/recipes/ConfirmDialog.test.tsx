import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../components";
import { renderWithTheme } from "../test-utils";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("renders the trigger", () => {
    renderWithTheme(<ConfirmDialog trigger={<Button>Delete</Button>} title="Delete?" />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("opens the alert dialog and fires onConfirm", async () => {
    let confirmed = false;
    renderWithTheme(
      <ConfirmDialog
        trigger={<Button>Delete</Button>}
        title="Delete account?"
        confirmLabel="Delete now"
        onConfirm={() => {
          confirmed = true;
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    const confirm = await screen.findByRole("button", { name: "Delete now" });
    fireEvent.click(confirm);
    expect(confirmed).toBe(true);
  });
});
