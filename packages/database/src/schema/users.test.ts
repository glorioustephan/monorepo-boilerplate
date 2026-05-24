import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { users } from "./users";

describe("users schema", () => {
  it("maps to the users table", () => {
    expect(getTableName(users)).toBe("users");
  });
});
