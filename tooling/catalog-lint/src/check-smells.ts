import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

/**
 * Code-smell check. A focused, heuristic scan for the patterns LLM-generated
 * code tends to leave behind — naive placeholder stubs, swallowed errors, stray
 * `console.log`, `any` escapes, and exports missing the JSDoc the TypeScript
 * reference requires. It is **advisory only**: it writes findings to stderr and
 * always exits 0, so it never blocks a commit. oxlint can't express these, which
 * is why they live here alongside the token check.
 */

export type SmellRule =
  | 'not-implemented'
  | 'placeholder-body'
  | 'empty-catch'
  | 'console-log'
  | 'explicit-any'
  | 'missing-jsdoc';

export interface Smell {
  readonly file: string;
  readonly line: number;
  readonly rule: SmellRule;
  readonly snippet: string;
}

const NOT_IMPLEMENTED = /throw new Error\(\s*["'`].*\b(?:not|un)\s*-?\s*implemented\b/i;
const PLACEHOLDER_BODY = /^\s*\/\/\s*\.\.\.\s*$/;
const EMPTY_CATCH = /\bcatch\s*(?:\([^)]*\))?\s*\{\s*\}/;
const CONSOLE_LOG = /\bconsole\.log\s*\(/;
const EXPLICIT_ANY = /(?::\s*any\b|\bas\s+any\b)/;

// Top-level declaration export (not a re-export like `export { x }`).
const EXPORT_DECL =
  /^export\s+(?:default\s+)?(?:async\s+)?(?:abstract\s+)?(?:function|const|let|class|interface|type|enum)\s+[A-Za-z_$]/;

const SOURCE_EXT = new Set(['.ts', '.tsx']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.next', '.turbo', 'coverage', '.git']);

// Generated output and test files aren't hand-authored product code — the smell
// rules (esp. missing-jsdoc) don't apply to them.
function isScannable(name: string): boolean {
  if (name.endsWith('.d.ts') || name.endsWith('.generated.ts')) return false;
  if (/\.(?:test|spec)\.tsx?$/.test(name)) return false;
  return SOURCE_EXT.has(extname(name));
}

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
    } else if (isScannable(name)) {
      out.push(full);
    }
  }
  return out;
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
    else if (isScannable(basename(path))) files.push(path);
  }
  return files;
}

/** The nearest non-blank line above `index`, or undefined if there is none. */
function previousNonBlank(lines: readonly string[], index: number): string | undefined {
  for (let i = index - 1; i >= 0; i--) {
    const line = lines[i];
    if (line !== undefined && line.trim().length > 0) return line;
  }
  return undefined;
}

function scanFile(file: string): Smell[] {
  const smells: Smell[] = [];
  const lines = readFileSync(file, 'utf8').split('\n');
  const push = (rule: SmellRule, index: number, line: string): void => {
    smells.push({ file, line: index + 1, rule, snippet: line.trim() });
  };

  lines.forEach((line, index) => {
    if (NOT_IMPLEMENTED.test(line)) push('not-implemented', index, line);
    if (PLACEHOLDER_BODY.test(line)) push('placeholder-body', index, line);
    if (EMPTY_CATCH.test(line)) push('empty-catch', index, line);
    if (CONSOLE_LOG.test(line)) push('console-log', index, line);
    if (EXPLICIT_ANY.test(line)) push('explicit-any', index, line);
    if (EXPORT_DECL.test(line)) {
      const prev = previousNonBlank(lines, index);
      const documented = prev?.trimEnd().endsWith('*/') ?? false;
      if (!documented) push('missing-jsdoc', index, line);
    }
  });
  return smells;
}

/** Scan the given files/directories for code smells. */
export function findSmells(paths: readonly string[]): Smell[] {
  return collectFiles(paths).flatMap(scanFile);
}

const HINTS: Record<SmellRule, string> = {
  'not-implemented': 'replace the placeholder stub with a real implementation',
  'placeholder-body': 'fill in the elided body — no `// ...` placeholders',
  'empty-catch': 'handle the error or rethrow; never swallow it silently',
  'console-log': 'use the @monorepo-boilerplate/logger (stderr-safe) instead of console.log',
  'explicit-any': 'avoid `any` — use `unknown` with a guard, or a precise type',
  'missing-jsdoc': 'add a /** JSDoc */ describing what/why for this export',
};

// Product + library source. Meta dirs (`tooling/`) are excluded so this checker
// doesn't flag its own pattern strings.
const DEFAULT_ROOTS = ['apps', 'packages', 'mcp-servers', 'services'];

function main(): void {
  const args = process.argv.slice(2);
  const paths = args.length > 0 ? args : DEFAULT_ROOTS;
  const smells = findSmells(paths);

  for (const s of smells) {
    process.stderr.write(`${s.file}:${s.line}: [${s.rule}] ${HINTS[s.rule]}\n    ${s.snippet}\n`);
  }
  if (smells.length > 0) {
    process.stderr.write(`\n${smells.length} code-smell warning(s) (advisory).\n`);
  }
  // Advisory only — never fail the commit on a heuristic.
  process.exit(0);
}

// Run as a CLI when invoked directly (not when imported).
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main();
}
