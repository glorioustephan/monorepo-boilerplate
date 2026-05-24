import { describe, expect, it } from "vitest";

import { greet } from "./greet";

describe("greet", () => {
  it("greets the given name", () => {
    expect(greet({ name: "World" })).toEqual({
      content: [{ type: "text", text: "Hello, World!" }],
    });
  });
});
