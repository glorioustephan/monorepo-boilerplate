import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Dialog, DialogTrigger } from "./dialog";

describe("Dialog", () => {
  it("renders its trigger (content is portalled on open)", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });
});
