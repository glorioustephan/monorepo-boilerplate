import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

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

function makeCatalog(): Catalog {
  const path = join(mkdtempSync(join(tmpdir(), 'catalog-')), 'catalog.db');
  buildCatalog(path, records);
  return openCatalog(path);
}

describe('catalog db', () => {
  it('full-text searches over description', () => {
    const catalog = makeCatalog();
    expect(catalog.search('modal overlay').map((r) => r.name)).toContain('Dialog');
    catalog.close();
  });

  it('gets a component case-insensitively', () => {
    const catalog = makeCatalog();
    expect(catalog.get('button')?.name).toBe('Button');
    expect(catalog.get('nope')).toBeUndefined();
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

  it('returns nothing for an empty query', () => {
    const catalog = makeCatalog();
    expect(catalog.search('   ')).toEqual([]);
    catalog.close();
  });
});
