import { AppError } from "@monorepo-boilerplate/types";
import { eq } from "drizzle-orm";

import type { Database } from "../client";
import { users, type NewUser, type User } from "../schema";

/** Reusable, typed query functions. Pass the `Database` in so they stay testable. */

export async function getUserByEmail(db: Database, email: string): Promise<User | undefined> {
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return rows[0];
}

export async function insertUser(db: Database, values: NewUser): Promise<User> {
  const [row] = await db.insert(users).values(values).returning();
  if (!row) {
    throw new AppError("Insert returned no row", { code: "INTERNAL" });
  }
  return row;
}
