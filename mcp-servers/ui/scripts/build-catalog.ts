/**
 * Build the UI component catalog database.
 *
 * Scrapes the kit's atom manifest (and the generated reference stories as verbatim
 * examples) into catalog records, then writes `mcp-servers/ui/catalog.db`. Run via
 * `pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog` (the package `build`
 * runs it before bundling). Build-time only — never imported by the server runtime.
 *
 * TODO(semantic): compute MiniLM embeddings here and populate the `vectors` table so
 * the runtime can fuse FTS5 lexical scores with brute-force cosine (hybrid retrieval).
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { components } from "@monorepo-boilerplate/ui/components/components.manifest";

import { buildCatalog } from "../src/catalog/db";
import type { ComponentRecord } from "../src/catalog/schema";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = resolve(packageRoot, "../../packages/ui/src/components");
const dbPath = join(packageRoot, "catalog.db");

const categorySlug = (category: string): string => category.toLowerCase().replaceAll(" ", "-");

function readExample(spec: { name: string; category: string }): string | undefined {
  const storyPath = join(componentsDir, categorySlug(spec.category), `${spec.name}.stories.tsx`);
  return existsSync(storyPath) ? readFileSync(storyPath, "utf8") : undefined;
}

const records: ComponentRecord[] = components.map((spec) => ({
  name: spec.name,
  tier: "Component",
  category: spec.category,
  renderEnv: spec.renderEnv,
  description: spec.usage,
  variants: spec.axes?.map((axis) => ({ prop: axis.prop, values: axis.values })),
  parts: spec.parts,
  example: readExample(spec),
}));

buildCatalog(dbPath, records);
process.stderr.write(`build-catalog: wrote ${records.length} components -> ${dbPath}\n`);
