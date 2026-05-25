import { describe, expect, it } from 'vitest';

import { categorySlug, componentDoc, detectRenderEnv, isComponentFile } from './scrape';

describe('categorySlug', () => {
  it('lowercases and hyphenates multi-word categories', () => {
    expect(categorySlug('Data Display')).toBe('data-display');
    expect(categorySlug('Forms')).toBe('forms');
  });
});

describe('detectRenderEnv', () => {
  it('classifies a single-quoted "use client" directive', () => {
    expect(detectRenderEnv("'use client';\nexport function X() {}")).toBe('client');
  });

  it('classifies a double-quoted "use client" directive (quote-agnostic)', () => {
    expect(detectRenderEnv('"use client";\nexport function X() {}')).toBe('client');
  });

  it('classifies a "use server" directive', () => {
    expect(detectRenderEnv("'use server';\nexport function action() {}")).toBe('server');
  });

  it('defaults to universal with no directive', () => {
    expect(detectRenderEnv('export function X() {}')).toBe('universal');
  });

  it('ignores the words appearing later in the file (must be a leading directive)', () => {
    expect(detectRenderEnv('export const note = "use client when interactive";')).toBe('universal');
  });
});

describe('componentDoc', () => {
  it('extracts and flattens the JSDoc above the matching export', () => {
    const source = [
      '/**',
      ' * A confirm dialog.',
      ' * Interrupts to confirm a destructive action.',
      ' */',
      'export function ConfirmDialog() {}',
    ].join('\n');
    expect(componentDoc(source, 'ConfirmDialog')).toBe(
      'A confirm dialog. Interrupts to confirm a destructive action.',
    );
  });

  it('returns undefined when the export has no doc comment', () => {
    expect(componentDoc('export function Bare() {}', 'Bare')).toBeUndefined();
  });

  it('does not pick up a doc comment attached to a different export', () => {
    const source = [
      '/** Doc for Other. */',
      'export function Other() {}',
      'export function Me() {}',
    ].join('\n');
    expect(componentDoc(source, 'Me')).toBeUndefined();
  });
});

describe('isComponentFile', () => {
  it('accepts a component file', () => {
    expect(isComponentFile('ConfirmDialog.tsx')).toBe(true);
  });

  it('rejects story and test sidecars and non-tsx files', () => {
    expect(isComponentFile('ConfirmDialog.stories.tsx')).toBe(false);
    expect(isComponentFile('ConfirmDialog.test.tsx')).toBe(false);
    expect(isComponentFile('ConfirmDialog.ts')).toBe(false);
  });
});
