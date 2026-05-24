import { ANNOTATION_TAGS, type Annotation, type AnnotationTag } from "./scan";

/**
 * Renders harvested annotations into the `docs/todo.md` markdown. The generated
 * content lives between marker comments so a regeneration replaces only that
 * block — any hand-written notes a developer adds above or below the markers are
 * preserved. Output is fully deterministic (stable grouping + sort) so
 * `todos:check` can diff it in CI.
 */

export const BEGIN_MARKER = "<!-- BEGIN GENERATED:annotations -->";
export const END_MARKER = "<!-- END GENERATED:annotations -->";

const HEADING: Record<AnnotationTag, string> = {
  TODO: "TODO",
  FIXME: "FIXME",
  HACK: "HACK",
  XXX: "XXX",
  BUG: "BUG",
  "@deprecated": "Deprecated",
};

// Tags where a missing `(#123)` issue link is worth flagging (the repo convention).
const LINK_EXPECTED = new Set<AnnotationTag>(["TODO", "FIXME"]);

function byFileThenLine(a: Annotation, b: Annotation): number {
  return a.file === b.file ? a.line - b.line : a.file.localeCompare(b.file);
}

function renderItem(annotation: Annotation): string {
  const flag = LINK_EXPECTED.has(annotation.tag) && !annotation.hasIssueLink ? "⚠ " : "";
  return `- ${flag}\`${annotation.file}:${annotation.line}\` — ${annotation.text}`;
}

/** Render the generated block body (everything between the markers). */
export function renderAnnotationsBlock(annotations: readonly Annotation[]): string {
  if (annotations.length === 0) return "_No outstanding annotations._";

  const unlinked = annotations.filter((a) => LINK_EXPECTED.has(a.tag) && !a.hasIssueLink).length;
  const summary =
    `_${annotations.length} annotation(s)` +
    (unlinked > 0 ? `, ${unlinked} ⚠ missing an issue link (\`TODO(#123)\`)` : "") +
    "._";

  const sections: string[] = [];
  for (const tag of ANNOTATION_TAGS) {
    const items = annotations.filter((a) => a.tag === tag).toSorted(byFileThenLine);
    if (items.length === 0) continue;
    sections.push(`## ${HEADING[tag]} (${items.length})\n\n${items.map(renderItem).join("\n")}`);
  }

  return `${summary}\n\n${sections.join("\n\n")}`;
}

const DEFAULT_PREAMBLE = `# TODO

Follow-up markers harvested from code comments by \`pnpm todos:generate\` (run
automatically on commit). **Do not edit the block between the markers by hand** —
fix the source comment and regenerate. Anything outside the markers is preserved.
A ⚠ flags a \`TODO\`/\`FIXME\` missing an issue link (\`TODO(#123)\`).
`;

/**
 * Produce the full `docs/todo.md`. If `existing` already contains the markers,
 * only the block between them is replaced; otherwise a fresh document is created.
 */
export function renderTodoDoc(annotations: readonly Annotation[], existing?: string): string {
  const block = `${BEGIN_MARKER}\n\n${renderAnnotationsBlock(annotations)}\n\n${END_MARKER}`;

  if (existing) {
    const begin = existing.indexOf(BEGIN_MARKER);
    const end = existing.indexOf(END_MARKER);
    if (begin !== -1 && end !== -1 && end > begin) {
      const before = existing.slice(0, begin);
      const after = existing.slice(end + END_MARKER.length);
      return `${before}${block}${after}`;
    }
  }

  return `${DEFAULT_PREAMBLE}\n${block}\n`;
}
