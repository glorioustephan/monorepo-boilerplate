import { describe, expect, it } from 'vitest';

import { BEGIN_MARKER, END_MARKER, renderTodoDoc } from './render';
import type { Annotation } from './scan';

const annotations: readonly Annotation[] = [
  { file: 'apps/web/b.ts', line: 9, tag: 'TODO', text: 'later', hasIssueLink: false },
  { file: 'apps/web/a.ts', line: 2, tag: 'TODO', text: 'linked', hasIssueLink: true },
  { file: 'apps/web/a.ts', line: 5, tag: 'FIXME', text: 'fix me', hasIssueLink: false },
];

describe('renderTodoDoc', () => {
  it('is deterministic — same input renders identical output', () => {
    expect(renderTodoDoc(annotations)).toBe(renderTodoDoc(annotations));
  });

  it('sorts items by file then line and flags unlinked TODO/FIXME with ⚠', () => {
    const out = renderTodoDoc(annotations);
    expect(out.indexOf('apps/web/a.ts:2')).toBeLessThan(out.indexOf('apps/web/b.ts:9'));
    expect(out).toContain('⚠ `apps/web/b.ts:9`');
    expect(out).not.toContain('⚠ `apps/web/a.ts:2`'); // linked → no flag
  });

  it('preserves human content outside the markers on regeneration', () => {
    const existing = renderTodoDoc(annotations);
    const edited = existing.replace(END_MARKER, `${END_MARKER}\n\n## Roadmap notes\n\nKeep me.\n`);
    const regenerated = renderTodoDoc([], edited);
    expect(regenerated).toContain('## Roadmap notes');
    expect(regenerated).toContain('Keep me.');
    expect(regenerated).toContain('_No outstanding annotations._');
    // Markers survive the round-trip.
    expect(regenerated).toContain(BEGIN_MARKER);
    expect(regenerated).toContain(END_MARKER);
  });
});
