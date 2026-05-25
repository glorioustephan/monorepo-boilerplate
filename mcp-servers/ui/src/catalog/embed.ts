/**
 * MiniLM sentence embeddings (all-MiniLM-L6-v2, 384-dim) via @huggingface/transformers.
 *
 * Used at build time (to embed catalog records → the `vectors` table) and at runtime (to embed
 * the search query for hybrid retrieval). The model + onnxruntime are loaded **lazily via dynamic
 * import** so the server starts even when the package isn't installed, and `embed` returns
 * `undefined` on any failure (offline, missing model/binary) — callers then fall back to lexical
 * search. transformers writes only to stderr, so it's safe in the stdio MCP server.
 */

export const EMBED_MODEL = 'Xenova/all-MiniLM-L6-v2';
export const EMBED_DIM = 384;

type Extractor = (
  text: string,
  opts: { pooling: 'mean'; normalize: boolean },
) => Promise<{ data: Float32Array }>;

let extractorPromise: Promise<Extractor> | undefined;

async function getExtractor(): Promise<Extractor> {
  const { pipeline } = await import('@huggingface/transformers');
  return (await pipeline('feature-extraction', EMBED_MODEL)) as unknown as Extractor;
}

/**
 * Embed one string into a normalized 384-dim vector, or `undefined` if the model can't load.
 * (Embed a single string at a time — batching mean-pools over padding and degrades vectors.)
 */
export async function embed(text: string): Promise<Float32Array | undefined> {
  try {
    extractorPromise ??= getExtractor();
    const out = await (await extractorPromise)(text, { pooling: 'mean', normalize: true });
    return out.data;
  } catch {
    return undefined;
  }
}
