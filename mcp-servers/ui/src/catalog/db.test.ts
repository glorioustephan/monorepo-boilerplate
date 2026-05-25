import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

import { describe, expect, it } from 'vitest';

import { buildCatalog, type Catalog, openCatalog } from './db';
import type { ComponentRecord } from './schema';

const records: ComponentRecord[] = [
  {
    name: 'Dialog',
    tier: 'Component',
    category: 'Overlays',
    renderEnv: 'client',
    description: 'Modal dialog overlay window',
    parts: ['Root', 'Trigger', 'Content'],
  },
  {
    name: 'Button',
    tier: 'Component',
    category: 'Forms',
    renderEnv: 'universal',
    description: 'Action trigger click',
    variants: [{ prop: 'variant', values: ['solid', 'soft'] }],
  },
  {
    name: 'Hero',
    tier: 'Block',
    category: 'Marketing',
    renderEnv: 'server',
    description: 'Hero section band',
  },
];

function tempDbPath(): string {
  return join(mkdtempSync(join(tmpdir(), 'catalog-')), 'catalog.db');
}

function makeCatalog(vectors?: ReadonlyMap<string, Float32Array>): Catalog {
  const path = tempDbPath();
  buildCatalog(path, records, vectors);
  return openCatalog(path);
}

describe('catalog db — lexical', () => {
  it('full-text searches over description', () => {
    const catalog = makeCatalog();
    expect(catalog.search('modal overlay').map((r) => r.name)).toContain('Dialog');
    catalog.close();
  });

  it('weights a name match above a description-only match', () => {
    const catalog = makeCatalog();
    // "button" is Button's name and absent elsewhere → Button ranks first.
    expect(catalog.search('button')[0]?.name).toBe('Button');
    catalog.close();
  });

  it('drops stopwords but still matches the meaningful term', () => {
    const catalog = makeCatalog();
    // "the" / "a" are stopwords; "action" matches Button's description.
    expect(catalog.search('the action of a').map((r) => r.name)).toContain('Button');
    catalog.close();
  });

  it('returns nothing for a no-match query', () => {
    const catalog = makeCatalog();
    expect(catalog.search('zzzznotacomponent')).toEqual([]);
    catalog.close();
  });

  it('returns nothing for an empty query', () => {
    const catalog = makeCatalog();
    expect(catalog.search('   ')).toEqual([]);
    catalog.close();
  });
});

describe('catalog db — retrieval', () => {
  it('gets a component case-insensitively', () => {
    const catalog = makeCatalog();
    expect(catalog.get('button')?.name).toBe('Button');
    expect(catalog.get('nope')).toBeUndefined();
    catalog.close();
  });

  it('lists summaries for every component', () => {
    const catalog = makeCatalog();
    const list = catalog.list();
    expect(list).toHaveLength(3);
    expect(list[0]).toEqual({
      name: expect.any(String),
      tier: expect.any(String),
      description: expect.any(String),
    });
    catalog.close();
  });

  it('lists by tier', () => {
    const catalog = makeCatalog();
    expect(catalog.listByTier('Block').map((r) => r.name)).toEqual(['Hero']);
    catalog.close();
  });

  it('filters by render environment', () => {
    const catalog = makeCatalog();
    expect(catalog.filterByRenderEnv('client').map((r) => r.name)).toEqual(['Dialog']);
    catalog.close();
  });
});

describe('catalog db — hybrid (vectors)', () => {
  // Orthonormal vectors: each record points down its own axis.
  const vectors = new Map<string, Float32Array>([
    ['Dialog', new Float32Array([1, 0, 0, 0])],
    ['Button', new Float32Array([0, 1, 0, 0])],
    ['Hero', new Float32Array([0, 0, 1, 0])],
  ]);

  it('surfaces the semantically-nearest record when the query has no lexical hit', () => {
    const catalog = makeCatalog(vectors);
    const queryVec = new Float32Array([1, 0, 0, 0]); // nearest to Dialog
    const hits = catalog.search('zzzznotacomponent', queryVec);
    expect(hits[0]?.name).toBe('Dialog');
    catalog.close();
  });

  it('fuses lexical and semantic — a lexical+semantic match outranks semantic-only', () => {
    const catalog = makeCatalog(vectors);
    const queryVec = new Float32Array([0, 1, 0, 0]); // nearest to Button
    // "click" matches Button lexically AND the vector points at Button.
    expect(catalog.search('click', queryVec)[0]?.name).toBe('Button');
    catalog.close();
  });

  it('does not crash or poison results on a query-vector dimension mismatch', () => {
    const catalog = makeCatalog(vectors);
    const wrongDim = new Float32Array([1, 0, 0]); // 3 dims vs stored 4
    // cosine returns 0 on mismatch → falls back to the lexical signal, no NaN.
    expect(catalog.search('button', wrongDim)[0]?.name).toBe('Button');
    catalog.close();
  });

  it('degrades to lexical when no query vector is supplied even though vectors exist', () => {
    const catalog = makeCatalog(vectors);
    expect(catalog.search('modal').map((r) => r.name)).toContain('Dialog');
    catalog.close();
  });
});

describe('catalog db — integrity', () => {
  it('round-trips a stored vector intact', () => {
    const vec = new Float32Array([0.5, -0.25, 0.125, 1]);
    const path = tempDbPath();
    buildCatalog(path, records, new Map([['Dialog', vec]]));
    // A query vector identical to the stored one yields cosine 1 → top hit.
    const catalog = openCatalog(path);
    expect(catalog.search('zzz', vec)[0]?.name).toBe('Dialog');
    catalog.close();
  });

  it('throws loudly if a stored record is corrupt', () => {
    const path = tempDbPath();
    buildCatalog(path, records);
    const db = new DatabaseSync(path);
    db.prepare(`UPDATE components SET data = ? WHERE name = ?`).run('{not valid json', 'Button');
    db.close();
    expect(() => openCatalog(path)).toThrow();
  });
});
