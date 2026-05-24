import { createLogger } from "@monorepo-boilerplate/logger";

import { getDatabase } from "./client";
import { users } from "./schema";

// Idempotent seed: `pnpm --filter @monorepo-boilerplate/database db:seed`.
const log = createLogger("db:seed", { destination: process.stdout });
const db = getDatabase();

await db
  .insert(users)
  .values({ email: "demo@example.com", name: "Demo User" })
  .onConflictDoNothing();

log.info("Seed complete");
process.exit(0);
