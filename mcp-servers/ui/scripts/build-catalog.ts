/**
 * Build the UI component catalog database.
 *
 * Scrapes the kit into catalog records and writes `mcp-servers/ui/catalog.db`:
 *  - generated components — from the kit's atom manifest (+ their reference stories as examples)
 *  - authored composites — recipes/blocks/templates: name from the file, tier from the folder,
 *    description from the component's JSDoc, example from `examples/<Name>.example.tsx`
 *
 * Each record is also embedded with MiniLM into the `vectors` table, so the runtime can fuse FTS5
 * lexical scores with brute-force cosine (hybrid retrieval). If the model is unavailable, vectors
 * stay empty and the catalog degrades to lexical-only.
 *
 * Run via `pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog` (the package `build` runs it
 * before bundling). Build-time only — never imported by the server runtime.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { components } from '@monorepo-boilerplate/ui/components/components.manifest';

import { buildCatalog } from '../src/catalog/db';
import { embed } from '../src/catalog/embed';
import type { ComponentRecord, Tier } from '../src/catalog/schema';
import {
  categorySlug,
  componentDoc,
  detectRenderEnv,
  isComponentFile,
} from '../src/catalog/scrape';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const uiSrc = resolve(packageRoot, '../../packages/ui/src');
const examplesDir = resolve(uiSrc, '../examples');
const dbPath = join(packageRoot, 'catalog.db');

const readExample = (path: string): string | undefined =>
  existsSync(path) ? readFileSync(path, 'utf8') : undefined;

// --- Generated Radix re-exports (from the manifest) ---
const componentRecords: ComponentRecord[] = components.map((spec) => ({
  name: spec.name,
  tier: 'Component',
  category: spec.category,
  renderEnv: spec.renderEnv,
  description: spec.usage,
  variants: spec.axes?.map((axis) => ({ prop: axis.prop, values: axis.values })),
  parts: spec.parts,
  example: readExample(
    join(uiSrc, 'components', categorySlug(spec.category), `${spec.name}.stories.tsx`),
  ),
}));

// --- Authored composites (recipes / blocks / templates) ---
const COMPOSITE_TIERS: ReadonlyArray<{ dir: string; tier: Tier }> = [
  { dir: 'recipes', tier: 'Recipe' },
  { dir: 'blocks', tier: 'Block' },
  { dir: 'templates', tier: 'Template' },
];

function scanComposites(): ComponentRecord[] {
  const records: ComponentRecord[] = [];
  for (const { dir, tier } of COMPOSITE_TIERS) {
    const full = join(uiSrc, dir);
    if (!existsSync(full)) continue;
    for (const file of readdirSync(full)) {
      if (!isComponentFile(file)) continue;
      const name = file.replace(/\.tsx$/, '');
      const source = readFileSync(join(full, file), 'utf8');
      records.push({
        name,
        tier,
        category: tier,
        renderEnv: detectRenderEnv(source),
        description: componentDoc(source, name) ?? `${name} (${tier})`,
        example: readExample(join(examplesDir, `${name}.example.tsx`)),
      });
    }
  }
  return records;
}

const records = [...componentRecords, ...scanComposites()];

// Surface components shipping without a usage example — they still index, but agents lose the
// most valuable signal (a runnable snippet). Advisory, not fatal: keeps the build green.
const missingExamples = records.filter((record) => !record.example).map((record) => record.name);
if (missingExamples.length > 0) {
  process.stderr.write(
    `build-catalog: ${missingExamples.length} components have no example: ${missingExamples.join(', ')}\n`,
  );
}

// Embed each record (one at a time — batching mean-pools over padding). If the model is
// unavailable (offline / not installed), vectors stay empty and the catalog is lexical-only.
const vectors = new Map<string, Float32Array>();
for (const record of records) {
  // Embed clean semantic text (name + description); category/tier are noise for NL queries.
  // Sequential on purpose — one model pipeline, one short string at a time (no concurrency win).
  // oxlint-disable-next-line no-await-in-loop
  const vector = await embed(`${record.name}. ${record.description}`);
  if (vector) vectors.set(record.name, vector);
}

buildCatalog(dbPath, records, vectors);
process.stderr.write(
  `build-catalog: wrote ${records.length} components (${vectors.size} embedded) -> ${dbPath}\n`,
);
