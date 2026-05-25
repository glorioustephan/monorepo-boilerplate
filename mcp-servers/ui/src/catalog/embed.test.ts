import { afterEach, describe, expect, it, vi } from 'vitest';

import { EMBED_DIM } from './embed';

// Hoisted so the (hoisted) vi.mock factory can reference it.
const { pipeline } = vi.hoisted(() => ({ pipeline: vi.fn() }));
vi.mock('@huggingface/transformers', () => ({ pipeline }));

afterEach(() => {
  vi.resetModules(); // drop the cached extractor singleton between cases
  pipeline.mockReset();
});

/** Make the mocked pipeline resolve to an extractor returning a vector of `dim` zeros. */
function extractorReturning(dim: number): void {
  pipeline.mockResolvedValue(async () => ({ data: new Float32Array(dim) }));
}

describe('embed', () => {
  it('returns a correctly-sized vector when the model loads', async () => {
    extractorReturning(EMBED_DIM);
    const { embed } = await import('./embed');
    const vector = await embed('hello');
    expect(vector).toBeInstanceOf(Float32Array);
    expect(vector).toHaveLength(EMBED_DIM);
  });

  it('rejects an unexpected embedding dimension (guards cosine against NaN)', async () => {
    extractorReturning(128);
    const { embed } = await import('./embed');
    expect(await embed('hello')).toBeUndefined();
  });

  it('falls back to undefined when the model cannot load', async () => {
    pipeline.mockRejectedValue(new Error('offline'));
    const { embed } = await import('./embed');
    expect(await embed('hello')).toBeUndefined();
  });
});
