import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

import { components } from '@monorepo-boilerplate/ui/components/components.manifest';

import { BANNER, renderAll } from './generate';

const OUT_DIR = resolve('packages/ui/src/components');
const files = renderAll(components);
const bannerHead = BANNER.slice(0, 40);

/** Generated file paths on disk (relative to OUT_DIR): the `.tsx` files + the root index.ts. */
function generatedOnDisk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...generatedOnDisk(full));
    else if (name.endsWith('.tsx') || (dir === OUT_DIR && name === 'index.ts')) {
      out.push(relative(OUT_DIR, full));
    }
  }
  return out;
}

const wasGenerated = (rel: string): boolean => {
  try {
    return readFileSync(join(OUT_DIR, rel), 'utf8').startsWith(bannerHead);
  } catch {
    return false;
  }
};

// Prune stale GENERATED files (component removed/renamed/recategorised). Never touch
// hand-authored files (e.g. a compound component's story) — they lack the banner.
for (const rel of generatedOnDisk(OUT_DIR)) {
  if (!(rel in files) && wasGenerated(rel)) rmSync(join(OUT_DIR, rel));
}

for (const [rel, contents] of Object.entries(files)) {
  const full = join(OUT_DIR, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents, 'utf8');
}

process.stderr.write(
  `ui:codegen: generated ${components.length} components (${Object.keys(files).length} files) -> ${OUT_DIR}\n`,
);
