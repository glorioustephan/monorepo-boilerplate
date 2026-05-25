import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { findTokenViolations } from './check-tokens';

function fixture(content: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'token-check-'));
  const file = join(dir, 'Comp.tsx');
  writeFileSync(file, content, 'utf8');
  return file;
}

describe('findTokenViolations', () => {
  it('flags arbitrary color values', () => {
    const file = fixture('export const x = <div className="bg-[#ff0000] text-foreground" />;');
    const v = findTokenViolations([file]);
    expect(v).toHaveLength(1);
    expect(v[0]?.rule).toBe('arbitrary-color');
  });

  it('flags raw palette colors', () => {
    const file = fixture('export const x = <div className="bg-red-600" />;');
    const v = findTokenViolations([file]);
    expect(v[0]?.rule).toBe('palette-color');
  });

  it('passes layout utilities (color comes from Radix props, not classes)', () => {
    const file = fixture(
      'export const x = <Flex className="flex gap-4 p-6 items-center"><Button color="blue" /></Flex>;',
    );
    expect(findTokenViolations([file])).toHaveLength(0);
  });
});
