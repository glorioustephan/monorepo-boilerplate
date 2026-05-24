import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderTodoDoc } from "./render";
import { findAnnotations } from "./scan";

// Product + library code. Meta directories (`tooling/`, `.claude/`) are
// deliberately excluded — their comments are about the tooling, not product
// follow-ups, and scanning them would re-harvest this harvester's own docs.
const DEFAULT_ROOTS = ["apps", "packages", "mcp-servers", "services"];

const args = process.argv.slice(2);
const writeIndex = args.indexOf("--write");
const shouldWrite = writeIndex !== -1;
const output = shouldWrite ? (args[writeIndex + 1] ?? "docs/todo.md") : undefined;

const roots = args.filter((arg, i) => arg !== "--write" && i !== writeIndex + 1);
const scanRoots = roots.length > 0 ? roots : DEFAULT_ROOTS;

const annotations = findAnnotations(scanRoots);

if (shouldWrite && output) {
  const path = resolve(output);
  const existing = existsSync(path) ? readFileSync(path, "utf8") : undefined;
  writeFileSync(path, renderTodoDoc(annotations, existing), "utf8");
  process.stderr.write(`todos: harvested ${annotations.length} annotation(s) -> ${output}\n`);
} else {
  // Advisory mode: print findings without touching any file.
  for (const a of annotations) {
    process.stderr.write(`${a.file}:${a.line}: [${a.tag}] ${a.text}\n`);
  }
  process.stderr.write(`\n${annotations.length} annotation(s).\n`);
}
