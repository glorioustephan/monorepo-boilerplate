import { checkEnv, printDoctorReport } from "@monorepo-boilerplate/environment";
import { z } from "zod";

// Mirror the variables defined in src/env.ts. `checkEnv` validates every key
// and reports each one, rather than throwing on the first failure.
const schemas = {
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SESSION_SECRET: z.string().min(16).default("dev-insecure-session-secret-change-me"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("monorepo-boilerplate"),
};

const ok = printDoctorReport(checkEnv(schemas));
process.exit(ok ? 0 : 1);
