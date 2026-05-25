import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

/**
 * Raw-color guard. Color in the kit and apps comes from Radix Themes — component
 * `color`/`variant` props and the theme's accent/gray scales — not from hand-written
 * Tailwind color classes. Tailwind is kept only for layout/spacing. So hand-written
 * arbitrary color values (`bg-[#fff]`, `text-[oklch(...)]`) and raw Tailwind palette
 * colors (`bg-red-600`) are bypasses and banned. oxlint has no Tailwind rule, so this
 * is a focused regex check over `.ts`/`.tsx` source. Theme/accent CSS files (which
 * legitimately define color scales) are intentionally not scanned.
 */

export interface TokenViolation {
  readonly file: string;
  readonly line: number;
  readonly rule: 'arbitrary-color' | 'palette-color';
  readonly snippet: string;
}

const COLOR_UTILITY =
  '(?:bg|text|border|ring|ring-offset|fill|stroke|from|via|to|decoration|accent|caret|divide|outline|shadow)';

// `bg-[#fff]`, `text-[oklch(...)]`, `ring-[rgb(...)]`, …
const ARBITRARY_COLOR = new RegExp(`${COLOR_UTILITY}-\\[(?:#|rgb|hsl|oklch|oklab|color\\()`, 'i');

// Raw Tailwind palette families with a numeric shade — bypasses semantic tokens.
const PALETTE =
  '(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)';
const PALETTE_COLOR = new RegExp(
  `\\b${COLOR_UTILITY}-${PALETTE}-(?:50|100|200|300|400|500|600|700|800|900|950)\\b`,
);

const SOURCE_EXT = new Set(['.ts', '.tsx']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.next', '.turbo', 'coverage']);

function walk(root: string): string[] {
  const out: string[] = [];
  let names: string[];
  try {
    names = readdirSync(root);
  } catch {
    return out;
  }
  for (const name of names) {
    const full = join(root, name);
    let isDirectory = false;
    try {
      isDirectory = statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (isDirectory) {
      if (!SKIP_DIRS.has(name)) out.push(...walk(full));
    } else if (SOURCE_EXT.has(extname(name)) && !name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
}

// Only UI/app source carries className/JSX. Tooling (incl. this checker's own
// fixtures), config, and tests elsewhere are out of scope for token rules.
function isDesignSurface(path: string): boolean {
  const p = path.replaceAll('\\', '/');
  if (p.includes('/tooling/') || p.startsWith('tooling/')) return false;
  return p.includes('packages/ui/') || p.includes('/apps/') || p.startsWith('apps/');
}

function collectFiles(paths: readonly string[]): string[] {
  const files: string[] = [];
  for (const path of paths) {
    let isDir = false;
    try {
      isDir = statSync(path).isDirectory();
    } catch {
      continue;
    }
    if (isDir) files.push(...walk(path));
    else if (SOURCE_EXT.has(extname(path))) files.push(path);
  }
  return files;
}

function scanFiles(files: readonly string[]): TokenViolation[] {
  const violations: TokenViolation[] = [];
  for (const file of files) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, index) => {
      if (ARBITRARY_COLOR.test(line)) {
        violations.push({ file, line: index + 1, rule: 'arbitrary-color', snippet: line.trim() });
      } else if (PALETTE_COLOR.test(line)) {
        violations.push({ file, line: index + 1, rule: 'palette-color', snippet: line.trim() });
      }
    });
  }
  return violations;
}

/** Scan the given files/directories for token-bypass violations (checks all paths given). */
export function findTokenViolations(paths: readonly string[]): TokenViolation[] {
  return scanFiles(collectFiles(paths));
}

const DEFAULT_ROOTS = ['packages/ui/src', 'apps/web/src'];

function main(): void {
  const args = process.argv.slice(2);
  const paths = args.length > 0 ? args : DEFAULT_ROOTS;
  // CLI only checks design surfaces (UI kit + apps), never tooling/config/tests elsewhere.
  const violations = scanFiles(collectFiles(paths).filter(isDesignSurface));

  for (const v of violations) {
    const fix =
      v.rule === 'arbitrary-color'
        ? 'drop the arbitrary color — use a Radix Themes `color`/`variant` prop instead'
        : 'drop the raw palette color — use a Radix Themes `color`/`variant` prop instead';
    process.stderr.write(`${v.file}:${v.line}: [${v.rule}] ${fix}\n    ${v.snippet}\n`);
  }
  if (violations.length > 0) {
    process.stderr.write(`\n${violations.length} token-bypass violation(s).\n`);
    process.exit(1);
  }
}

// Run as a CLI when invoked directly (not when imported).
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main();
}
