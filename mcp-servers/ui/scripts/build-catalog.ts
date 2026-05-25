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

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const uiSrc = resolve(packageRoot, '../../packages/ui/src');
const examplesDir = resolve(uiSrc, '../examples');
const dbPath = join(packageRoot, 'catalog.db');

const categorySlug = (category: string): string => category.toLowerCase().replaceAll(' ', '-');

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

/** The JSDoc block immediately preceding `export function <name>`, flattened to one line. */
function componentDoc(source: string, name: string): string | undefined {
  // `(?:(?!\*\/)[\s\S])*?` keeps the capture within a single comment block (no crossing `*/`).
  const match = source.match(
    new RegExp(`/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*export function ${name}\\b`),
  );
  if (!match?.[1]) return undefined;
  return (
    match[1]
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, '').trim())
      .filter(Boolean)
      .join(' ')
      .trim() || undefined
  );
}

function scanComposites(): ComponentRecord[] {
  const records: ComponentRecord[] = [];
  for (const { dir, tier } of COMPOSITE_TIERS) {
    const full = join(uiSrc, dir);
    if (!existsSync(full)) continue;
    for (const file of readdirSync(full)) {
      if (!file.endsWith('.tsx') || file.endsWith('.stories.tsx') || file.endsWith('.test.tsx')) {
        continue;
      }
      const name = file.replace(/\.tsx$/, '');
      const source = readFileSync(join(full, file), 'utf8');
      // No "use client" and no server-only directive ⇒ universal (renders in RSC or client).
      // Quote-agnostic so it survives single- or double-quote formatting.
      const renderEnv = /^\s*['"]use client['"]/m.test(source)
        ? 'client'
        : /^\s*['"]use server['"]/m.test(source)
          ? 'server'
          : 'universal';
      records.push({
        name,
        tier,
        category: tier,
        renderEnv,
        description: componentDoc(source, name) ?? `${name} (${tier})`,
        example: readExample(join(examplesDir, `${name}.example.tsx`)),
      });
    }
  }
  return records;
}

const records = [...componentRecords, ...scanComposites()];

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
