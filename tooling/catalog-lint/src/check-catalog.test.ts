import { describe, expect, it } from 'vitest';

import { Project, type SourceFile, ts } from 'ts-morph';

import { checkSourceFile } from './check-catalog';

// In-memory project so the pure checker can be exercised without touching disk.
function parseAt(path: string, code: string): SourceFile {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
  });
  return project.createSourceFile(path, code);
}

// Default fixtures live under apps/ (app-surface rules apply).
const parse = (code: string): SourceFile => parseAt('apps/web/src/Comp.tsx', code);

describe('checkSourceFile', () => {
  it('flags a raw <button> where Button exists', () => {
    const violations = checkSourceFile(parse('export const X = () => <button>Go</button>;'));
    expect(violations).toHaveLength(1);
    expect(violations[0]?.rule).toBe('no-raw-html-with-catalog-equivalent');
    expect(violations[0]?.message).toContain('Button');
  });

  it('flags raw <input> and <select> too', () => {
    const code = 'export const X = () => (<form><input /><select /></form>);';
    const rules = checkSourceFile(parse(code)).map((v) => v.rule);
    expect(rules).toEqual([
      'no-raw-html-with-catalog-equivalent',
      'no-raw-html-with-catalog-equivalent',
    ]);
  });

  it('does not flag the kit components themselves', () => {
    const code =
      'import { Button } from "@monorepo-boilerplate/ui";\nexport const X = () => <Button>Go</Button>;';
    expect(checkSourceFile(parse(code))).toHaveLength(0);
  });

  it('ignores raw elements without a catalog equivalent', () => {
    expect(checkSourceFile(parse('export const X = () => <div><span /></div>;'))).toHaveLength(0);
  });

  it('flags importing styling primitives the kit re-exports', () => {
    const code = 'import { cva } from "class-variance-authority";\nexport const x = cva("base");';
    const violations = checkSourceFile(parse(code));
    expect(violations).toHaveLength(1);
    expect(violations[0]?.rule).toBe('require-ui-import');
  });

  it('passes a clean app file using the kit', () => {
    const code =
      'import { Button, cn } from "@monorepo-boilerplate/ui";\nexport const X = () => <Button className={cn("p-2")}>Go</Button>;';
    expect(checkSourceFile(parse(code))).toHaveLength(0);
  });

  it('flags @radix-ui/themes imports outside the kit', () => {
    const violations = checkSourceFile(parse('import { Box } from "@radix-ui/themes";'));
    expect(violations).toHaveLength(1);
    expect(violations[0]?.rule).toBe('no-radix-outside-kit');
  });

  it('flags radix imports in non-app packages too', () => {
    const violations = checkSourceFile(
      parseAt('packages/database/src/x.ts', 'import { Theme } from "radix-ui";'),
    );
    expect(violations).toHaveLength(1);
    expect(violations[0]?.rule).toBe('no-radix-outside-kit');
  });

  it('allows Radix imports inside the kit (its sole importer)', () => {
    const code = 'import { Box } from "@radix-ui/themes";\nexport { Box };';
    expect(checkSourceFile(parseAt('packages/ui/src/primitives/Box.tsx', code))).toHaveLength(0);
  });
});
