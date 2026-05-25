import { describe, expect, it, vi } from 'vitest';

import type { Catalog } from './catalog/db';
import type { ComponentRecord } from './catalog/schema';
import { createTools } from './tools';

// Don't load the real MiniLM model in unit tests — search should still work (lexical fallback).
vi.mock('./catalog/embed', () => ({ embed: vi.fn(async () => undefined) }));

const button: ComponentRecord = {
  name: 'Button',
  tier: 'Component',
  category: 'Forms',
  renderEnv: 'universal',
  description: 'Action trigger',
  example: '<Button>Go</Button>',
};

function fakeCatalog(): Catalog {
  return {
    search: vi.fn(() => [button]),
    get: vi.fn((name: string) => (name.toLowerCase() === 'button' ? button : undefined)),
    list: vi.fn(() => [{ name: button.name, tier: button.tier, description: button.description }]),
    listByTier: vi.fn(() => [button]),
    filterByRenderEnv: vi.fn(() => [button]),
    close: vi.fn(),
  };
}

describe('createTools', () => {
  it('listComponents returns structured summaries and mirrors them in text', () => {
    const result = createTools(fakeCatalog()).listComponents();
    expect(result.structuredContent).toEqual({
      components: [{ name: 'Button', tier: 'Component', description: 'Action trigger' }],
    });
    expect(result.content[0]).toMatchObject({ type: 'text' });
    expect(JSON.parse((result.content[0] as { text: string }).text)).toEqual(
      result.structuredContent,
    );
  });

  it('getComponent returns the full record as structured content', () => {
    const result = createTools(fakeCatalog()).getComponent({ name: 'button' });
    expect(result.isError).toBeUndefined();
    expect(result.structuredContent).toMatchObject({
      name: 'Button',
      example: '<Button>Go</Button>',
    });
  });

  it('getComponent flags an unknown component as an error with no structured content', () => {
    const result = createTools(fakeCatalog()).getComponent({ name: 'Nope' });
    expect(result.isError).toBe(true);
    expect(result.structuredContent).toBeUndefined();
    expect((result.content[0] as { text: string }).text).toContain('Unknown component: Nope');
  });

  it('searchComponents embeds the query then returns hits as structured content', async () => {
    const catalog = fakeCatalog();
    const result = await createTools(catalog).searchComponents({ query: 'press' });
    expect(catalog.search).toHaveBeenCalledWith('press', undefined);
    expect(result.structuredContent).toEqual({ components: [button] });
  });

  it('listByTier and filterByRenderEnvironment forward their arguments', () => {
    const catalog = fakeCatalog();
    const tools = createTools(catalog);
    tools.listByTier({ tier: 'Component' });
    tools.filterByRenderEnvironment({ renderEnvironment: 'universal' });
    expect(catalog.listByTier).toHaveBeenCalledWith('Component');
    expect(catalog.filterByRenderEnv).toHaveBeenCalledWith('universal');
  });
});
