/**
 * Pure scraping helpers for the catalog build.
 *
 * Kept free of filesystem/IO so they can be unit-tested in isolation; `scripts/build-catalog.ts`
 * wires them to the filesystem and the embedding model.
 */
import type { RenderEnv } from './schema';

/** "Data Display" → "data-display" (matches the kit's category sub-folder names). */
export const categorySlug = (category: string): string =>
  category.toLowerCase().replaceAll(' ', '-');

/**
 * Classify a composite source file by its leading directive. No `'use client'`/`'use server'`
 * ⇒ universal (renders in RSC or on the client). Quote-agnostic so it survives oxfmt reformatting
 * between single and double quotes.
 */
export function detectRenderEnv(source: string): RenderEnv {
  if (/^\s*['"]use client['"]/m.test(source)) return 'client';
  if (/^\s*['"]use server['"]/m.test(source)) return 'server';
  return 'universal';
}

/**
 * Extract the JSDoc block immediately preceding `export function <name>`, flattened to one line.
 * Returns undefined when there's no doc comment.
 */
export function componentDoc(source: string, name: string): string | undefined {
  // `(?:(?!\*\/)[\s\S])*?` keeps the capture within a single comment block (no crossing `*/`).
  const match = source.match(
    new RegExp(`/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*export function ${name}\\b`),
  );
  if (!match?.[1]) return undefined;
  return (
    match[1]
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, '').trim())
      .filter(Boolean)
      .join(' ')
      .trim() || undefined
  );
}

/** Is this a component source file (not a story/test sidecar)? */
export const isComponentFile = (file: string): boolean =>
  file.endsWith('.tsx') && !file.endsWith('.stories.tsx') && !file.endsWith('.test.tsx');
