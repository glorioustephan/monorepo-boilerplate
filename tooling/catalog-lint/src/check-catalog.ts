import { readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

import { getComponent } from "@monorepo-boilerplate/ui/registry";
import { Project, type SourceFile, SyntaxKind, ts } from "ts-morph";

/**
 * Catalog enforcement (the inverse of the extractor: this reads app source and
 * the generated registry to push usage toward the kit). Two rules oxlint can't
 * express:
 *
 * - `no-raw-html-with-catalog-equivalent` — a raw `<button>`/`<input>`/`<select>`
 *   in an app where a kit component exists; use the component instead.
 * - `require-ui-import` — importing styling primitives the kit already wraps
 *   (`clsx`, `tailwind-merge`, `class-variance-authority`) in an app; import `cn`
 *   and components from `@monorepo-boilerplate/ui` instead.
 *
 * Only app source is scanned — the kit itself legitimately uses raw elements and
 * CVA. Escape hatch (documented in AGENTS.md): if nothing in the catalog fits,
 * add a catalog entry or compose Radix within the token contract.
 */

export type CatalogRule = "no-raw-html-with-catalog-equivalent" | "require-ui-import";

export interface CatalogViolation {
  readonly file: string;
  readonly line: number;
  readonly rule: CatalogRule;
  readonly message: string;
  readonly snippet: string;
}

// Raw intrinsic element → kit component. Filtered against the live registry at
// runtime, so the rule never suggests a component that has been removed.
const RAW_ELEMENT_EQUIVALENTS: Record<string, string> = {
  button: "Button",
  input: "Input",
  select: "Select",
};

// Styling primitives the kit re-exports; apps should not import them directly.
const KIT_STYLING_MODULES = new Set(["class-variance-authority", "clsx", "tailwind-merge"]);

const SOURCE_EXT = new Set([".ts", ".tsx"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".next", ".turbo", "coverage"]);

function firstLine(text: string): string {
  return text.split("\n")[0]?.trim() ?? "";
}

/** Run the catalog rules over one parsed source file. Pure — used directly in tests. */
export function checkSourceFile(sourceFile: SourceFile): CatalogViolation[] {
  const file = sourceFile.getFilePath();
  const violations: CatalogViolation[] = [];

  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];
  for (const element of elements) {
    const tag = element.getTagNameNode().getText();
    const equivalent = RAW_ELEMENT_EQUIVALENTS[tag];
    if (equivalent && getComponent(equivalent)) {
      violations.push({
        file,
        line: element.getStartLineNumber(),
        rule: "no-raw-html-with-catalog-equivalent",
        message: `use <${equivalent}> from @monorepo-boilerplate/ui instead of a raw <${tag}>`,
        snippet: firstLine(element.getText()),
      });
    }
  }

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const specifier = importDecl.getModuleSpecifierValue();
    if (KIT_STYLING_MODULES.has(specifier)) {
      violations.push({
        file,
        line: importDecl.getStartLineNumber(),
        rule: "require-ui-import",
        message: `import cn/components from @monorepo-boilerplate/ui instead of "${specifier}" directly`,
        snippet: firstLine(importDecl.getText()),
      });
    }
  }

  return violations.toSorted((a, b) => a.line - b.line);
}

// Catalog rules target app UI only; the kit and tooling are out of scope.
function isAppSurface(path: string): boolean {
  const p = path.replaceAll("\\", "/");
  return p.includes("/apps/") || p.startsWith("apps/");
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
    } else if (SOURCE_EXT.has(extname(name)) && !name.endsWith(".d.ts")) {
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
    else if (SOURCE_EXT.has(extname(path)) && !path.endsWith(".d.ts")) files.push(path);
  }
  return files;
}

/** Scan the given files/directories (filtered to app source) for catalog violations. */
export function findCatalogViolations(paths: readonly string[]): CatalogViolation[] {
  const files = collectFiles(paths).filter(isAppSurface);
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

const DEFAULT_ROOTS = ["apps"];

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
