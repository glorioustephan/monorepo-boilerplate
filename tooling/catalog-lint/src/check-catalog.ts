import { readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

import { components } from '@monorepo-boilerplate/ui/components/components.manifest';
import { Project, type SourceFile, SyntaxKind, ts } from 'ts-morph';

/**
 * Catalog enforcement — rules oxlint can't express, pushing all UI through the kit:
 *
 * - `no-radix-outside-kit` — `@radix-ui/themes` / `radix-ui` may only be imported inside
 *   `packages/ui` (the kit is Radix's sole importer). Anywhere else, import from
 *   `@monorepo-boilerplate/ui`. This is what makes the kit's encapsulation real.
 * - `no-raw-html-with-catalog-equivalent` — a raw `<button>`/`<input>`/`<select>`/`<textarea>`
 *   in an app where a kit atom exists; use the atom instead.
 * - `require-ui-import` — importing styling primitives the kit wraps (`clsx`, `tailwind-merge`,
 *   `class-variance-authority`) in an app; import `cn`/components from the kit instead.
 *
 * `packages/ui` is exempt (it legitimately imports Radix and wraps primitives). The raw-element
 * and require-ui-import rules target app source only; the Radix ban targets all non-kit source.
 */

export type CatalogRule =
  | 'no-radix-outside-kit'
  | 'no-raw-html-with-catalog-equivalent'
  | 'require-ui-import';

export interface CatalogViolation {
  readonly file: string;
  readonly line: number;
  readonly rule: CatalogRule;
  readonly message: string;
  readonly snippet: string;
}

// Component names the kit exposes (from the manifest) — the raw-element rule only
// suggests an equivalent that actually exists in the kit.
const COMPONENT_NAMES = new Set(components.map((spec) => spec.name));

// Raw intrinsic element → kit atom.
const RAW_ELEMENT_EQUIVALENTS: Record<string, string> = {
  button: 'Button',
  input: 'TextField',
  select: 'Select',
  textarea: 'TextArea',
};

// Styling primitives the kit re-exports; apps should not import them directly.
const KIT_STYLING_MODULES = new Set(['class-variance-authority', 'clsx', 'tailwind-merge']);

const SOURCE_EXT = new Set(['.ts', '.tsx']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.next', '.turbo', 'coverage']);

function firstLine(text: string): string {
  return text.split('\n')[0]?.trim() ?? '';
}

const toPosix = (path: string): string => path.replaceAll('\\', '/');
const isKitFile = (path: string): boolean => toPosix(path).includes('packages/ui/');
const isAppSurface = (path: string): boolean => {
  const p = toPosix(path);
  return p.includes('/apps/') || p.startsWith('apps/');
};

/** True for any import that reaches into Radix Themes / the Radix primitives package. */
function isRadixImport(specifier: string): boolean {
  return (
    specifier === '@radix-ui/themes' ||
    specifier.startsWith('@radix-ui/themes/') ||
    specifier === 'radix-ui' ||
    specifier.startsWith('radix-ui/')
  );
}

/** Run the catalog rules over one parsed source file. Pure — used directly in tests. */
export function checkSourceFile(sourceFile: SourceFile): CatalogViolation[] {
  const file = sourceFile.getFilePath();
  if (isKitFile(file)) return []; // the kit is the one place Radix may be imported.

  const violations: CatalogViolation[] = [];
  const app = isAppSurface(file);

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const specifier = importDecl.getModuleSpecifierValue();
    if (isRadixImport(specifier)) {
      violations.push({
        file,
        line: importDecl.getStartLineNumber(),
        rule: 'no-radix-outside-kit',
        message: `import UI from @monorepo-boilerplate/ui — Radix ("${specifier}") is encapsulated by the kit and must not be imported outside packages/ui`,
        snippet: firstLine(importDecl.getText()),
      });
    }
    if (app && KIT_STYLING_MODULES.has(specifier)) {
      violations.push({
        file,
        line: importDecl.getStartLineNumber(),
        rule: 'require-ui-import',
        message: `import cn/components from @monorepo-boilerplate/ui instead of "${specifier}" directly`,
        snippet: firstLine(importDecl.getText()),
      });
    }
  }

  if (app) {
    const elements = [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ];
    for (const element of elements) {
      const tag = element.getTagNameNode().getText();
      const equivalent = RAW_ELEMENT_EQUIVALENTS[tag];
      if (equivalent && COMPONENT_NAMES.has(equivalent)) {
        violations.push({
          file,
          line: element.getStartLineNumber(),
          rule: 'no-raw-html-with-catalog-equivalent',
          message: `use <${equivalent}> from @monorepo-boilerplate/ui instead of a raw <${tag}>`,
          snippet: firstLine(element.getText()),
        });
      }
    }
  }

  return violations.toSorted((a, b) => a.line - b.line);
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
    } else if (SOURCE_EXT.has(extname(name)) && !name.endsWith('.d.ts')) {
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
    else if (SOURCE_EXT.has(extname(path)) && !path.endsWith('.d.ts')) files.push(path);
  }
  return files;
}

/** Scan the given files/directories (excluding the kit itself) for catalog violations. */
export function findCatalogViolations(paths: readonly string[]): CatalogViolation[] {
  const files = collectFiles(paths).filter((f) => !isKitFile(f));
  if (files.length === 0) return [];

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, allowJs: false },
  });
  const violations: CatalogViolation[] = [];
  for (const file of files) {
    violations.push(...checkSourceFile(project.addSourceFileAtPath(file)));
  }
  return violations;
}

// Product/runtime code: apps, libraries, services, MCP servers. The kit (packages/ui) is
// filtered out per-file; build-time tooling never ships UI, so it's out of scope.
const DEFAULT_ROOTS = ['apps', 'packages', 'mcp-servers', 'services'];

function main(): void {
  const args = process.argv.slice(2);
  const paths = args.length > 0 ? args : DEFAULT_ROOTS;
  const violations = findCatalogViolations(paths);

  for (const v of violations) {
    process.stderr.write(`${v.file}:${v.line}: [${v.rule}] ${v.message}\n    ${v.snippet}\n`);
  }
  if (violations.length > 0) {
    process.stderr.write(`\n${violations.length} catalog violation(s).\n`);
    process.exit(1);
  }
}

// Run as a CLI when invoked directly (not when imported).
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main();
}
