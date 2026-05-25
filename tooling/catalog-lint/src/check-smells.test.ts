import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { findSmells } from './check-smells';

function fixture(content: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'smell-check-'));
  const file = join(dir, 'mod.ts');
  writeFileSync(file, content, 'utf8');
  return file;
}

function rules(content: string): string[] {
  return findSmells([fixture(content)]).map((s) => s.rule);
}

describe('findSmells', () => {
  it('flags a not-implemented placeholder stub', () => {
    expect(
      rules('/** doc */\nexport function f() {\n  throw new Error("Not implemented");\n}\n'),
    ).toContain('not-implemented');
  });

  it('flags an empty catch block', () => {
    expect(rules('/** doc */\nexport function f() {\n  try { g(); } catch {}\n}\n')).toContain(
      'empty-catch',
    );
  });

  it('flags console.log and explicit any', () => {
    const found = rules('/** doc */\nexport const f = (x: any) => console.log(x);\n');
    expect(found).toContain('console-log');
    expect(found).toContain('explicit-any');
  });

  it('flags an exported declaration with no preceding JSDoc', () => {
    expect(rules('export const value = 1;\n')).toContain('missing-jsdoc');
  });

  it('does not flag an export documented with JSDoc', () => {
    expect(rules('/** The value. */\nexport const value = 1;\n')).not.toContain('missing-jsdoc');
  });

  it('does not treat a re-export as an undocumented declaration', () => {
    expect(rules('export { value } from "./other";\n')).not.toContain('missing-jsdoc');
  });

  it('flags a `// ...` placeholder body', () => {
    expect(rules('/** doc */\nexport function f() {\n  // ...\n}\n')).toContain('placeholder-body');
  });
});
