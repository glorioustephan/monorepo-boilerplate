import { createLogger } from "@monorepo-boilerplate/logger";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { z } from "zod";

// Standalone migration runner: `pnpm --filter @monorepo-boilerplate/database db:migrate`.
const log = createLogger("db:migrate", { destination: process.stdout });
const url = z.string().url().parse(process.env.DATABASE_URL);
const sql = postgres(url, { max: 1 });

await migrate(drizzle(sql), {
  migrationsFolder: new URL("../migrations", import.meta.url).pathname,
});
await sql.end();
log.info("Migrations applied");
