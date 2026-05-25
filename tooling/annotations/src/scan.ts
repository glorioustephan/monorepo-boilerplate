import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

/**
 * Annotation harvester. Scans source across every language in the repo for
 * follow-up markers (`TODO`, `FIXME`, `HACK`, `XXX`, `BUG`, `@deprecated`) and
 * returns them so `docs/todo.md` can be regenerated from code. The markers must
 * appear inside a comment — the recognized comment leaders are keyed by file
 * type so a literal `"TODO"` in a string or shell `#!/usr/bin/env` line is
 * ignored. Markdown is intentionally not scanned (prose noise + it would
 * re-harvest the generated `docs/todo.md`).
 */

/** A single follow-up marker found in the codebase. */
export interface Annotation {
  readonly file: string;
  readonly line: number;
  readonly tag: AnnotationTag;
  readonly text: string;
  /** True when a TODO links an issue (`TODO(#123)`) — the repo convention. */
  readonly hasIssueLink: boolean;
}

export type AnnotationTag = 'TODO' | 'FIXME' | 'HACK' | 'XXX' | 'BUG' | '@deprecated';

export const ANNOTATION_TAGS: readonly AnnotationTag[] = [
  'TODO',
  'FIXME',
  'HACK',
  'XXX',
  'BUG',
  '@deprecated',
];

// Tag union as an alternation. `@deprecated` is matched case-insensitively and
// without a leading word boundary (the `@` is the boundary); the bare tags use
// `\b` so they don't match inside identifiers like `TODOS_REMAINING`.
const TAG_PATTERN = /(?:\b(TODO|FIXME|HACK|XXX|BUG)\b|(@deprecated))/i;

// Comment leaders by language family. A marker only counts when one of these
// appears at or before it on the line.
const SLASH = ['//', '/*', '*'];
const HASH = ['#'];
const DASH = ['--', '/*', '*'];

const EXT_LEADERS: Record<string, readonly string[]> = {
  '.ts': SLASH,
  '.tsx': SLASH,
  '.js': SLASH,
  '.jsx': SLASH,
  '.mjs': SLASH,
  '.cjs': SLASH,
  '.css': ['/*', '*'],
  '.scss': SLASH,
  '.sql': DASH,
  '.sh': HASH,
  '.bash': HASH,
  '.zsh': HASH,
  '.yml': HASH,
  '.yaml': HASH,
  '.toml': HASH,
};

const SKIP_DIRS = new Set(['node_modules', 'dist', '.next', '.turbo', 'coverage', '.git']);

// The harvested output itself — never scan it, or its own entries re-harvest.
const OUTPUT_FILE = 'docs/todo.md';

/** Resolve the comment leaders for a path, or `undefined` if it isn't scannable. */
function leadersFor(path: string): readonly string[] | undefined {
  const name = basename(path);
  if (name === 'Dockerfile' || name.startsWith('Dockerfile.')) return HASH;
  if (name === '.env' || name.startsWith('.env.')) return HASH;
  return EXT_LEADERS[extname(name)];
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
    } else if (leadersFor(full) && !name.endsWith('.d.ts')) {
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
    else if (leadersFor(path)) files.push(path);
  }
  return files.filter((f) => f.replaceAll('\\', '/') !== OUTPUT_FILE);
}

function scanLine(
  file: string,
  line: string,
  index: number,
  leaders: readonly string[],
): Annotation | undefined {
  const match = TAG_PATTERN.exec(line);
  if (!match) return undefined;

  const tagIndex = match.index;
  // The marker only counts inside a comment: a leader must precede it.
  const inComment = leaders.some((leader) => {
    const at = line.indexOf(leader);
    return at !== -1 && at <= tagIndex;
  });
  if (!inComment) return undefined;

  const raw = (match[1] ?? match[2]) as string;
  const tag = (raw.startsWith('@') ? '@deprecated' : raw.toUpperCase()) as AnnotationTag;

  // The message after the tag: drop a trailing block-comment close and leading
  // separators (`: `, `) `, `- `), but keep a `(#123)` issue link intact.
  const message = line
    .slice(tagIndex + raw.length)
    .replace(/\*\/\s*$/, '')
    .replace(/^[\s:-]+/, '')
    .trim();
  const text = message.length > 0 ? message : tag;

  const hasIssueLink = new RegExp(`${raw}\\s*\\(#\\d+\\)`, 'i').test(line);

  return { file, line: index + 1, tag, text, hasIssueLink };
}

function scanFiles(files: readonly string[]): Annotation[] {
  const annotations: Annotation[] = [];
  for (const file of files) {
    const leaders = leadersFor(file);
    if (!leaders) continue;
    let content: string;
    try {
      content = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    content.split('\n').forEach((line, index) => {
      const annotation = scanLine(file, line, index, leaders);
      if (annotation) annotations.push(annotation);
    });
  }
  return annotations;
}

/** Scan the given files/directories for follow-up annotations. */
export function findAnnotations(paths: readonly string[]): Annotation[] {
  return scanFiles(collectFiles(paths));
}
