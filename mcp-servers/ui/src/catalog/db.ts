/**
 * node:sqlite catalog store with hybrid retrieval.
 *
 * `buildCatalog` writes the DB at build time: a `components` table, an FTS5 index for lexical
 * search, and a `vectors` table of MiniLM embeddings. `openCatalog` opens it read-only, loads the
 * records + vectors into memory, and serves queries. `search` fuses FTS5 bm25 (lexical) with
 * brute-force cosine over the vectors (semantic) when a query vector is supplied; otherwise it
 * falls back to pure lexical ranking.
 *
 * Requires Node ≥22.5 run with `--experimental-sqlite`.
 */
import { DatabaseSync } from 'node:sqlite';

import {
  type ComponentRecord,
  componentRecordSchema,
  type ComponentSummary,
  type RenderEnv,
  type Tier,
} from './schema';

interface LexHit {
  readonly name: string;
  readonly score: number;
}

const parseRecord = (data: unknown): ComponentRecord =>
  componentRecordSchema.parse(JSON.parse(String(data)));

/** Cosine similarity of two L2-normalized vectors (== dot product). */
function cosine(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += (a[i] as number) * (b[i] as number);
  return dot;
}

const vectorToBlob = (vector: Float32Array): Uint8Array =>
  new Uint8Array(vector.buffer, vector.byteOffset, vector.byteLength);

const blobToVector = (blob: Uint8Array): Float32Array => new Float32Array(blob.slice().buffer);

/** Concatenated searchable text for the FTS5 index. */
function searchText(record: ComponentRecord): string {
  const variants = (record.variants ?? [])
    .map((variant) => `${variant.prop} ${variant.values.join(' ')}`)
    .join(' ');
  const parts = (record.parts ?? []).join(' ');
  return [
    record.name,
    record.tier,
    record.category,
    record.renderEnv,
    record.description,
    variants,
    parts,
  ]
    .filter(Boolean)
    .join(' ');
}

/** Create/overwrite the catalog database (atomic). Vectors are optional (lexical-only without them). */
export function buildCatalog(
  dbPath: string,
  records: readonly ComponentRecord[],
  vectors?: ReadonlyMap<string, Float32Array>,
): void {
  const db = new DatabaseSync(dbPath);
  db.exec(`
    DROP TABLE IF EXISTS components;
    DROP TABLE IF EXISTS components_fts;
    DROP TABLE IF EXISTS vectors;
    CREATE TABLE components (
      name TEXT PRIMARY KEY,
      tier TEXT NOT NULL,
      category TEXT NOT NULL,
      render_env TEXT NOT NULL,
      data TEXT NOT NULL
    );
    CREATE VIRTUAL TABLE components_fts USING fts5(name, text);
    CREATE TABLE vectors (name TEXT PRIMARY KEY, embedding BLOB NOT NULL);
  `);

  const insComponent = db.prepare(
    `INSERT INTO components (name, tier, category, render_env, data) VALUES (?, ?, ?, ?, ?)`,
  );
  const insFts = db.prepare(`INSERT INTO components_fts (name, text) VALUES (?, ?)`);
  const insVector = db.prepare(`INSERT INTO vectors (name, embedding) VALUES (?, ?)`);
  db.exec('BEGIN');
  try {
    for (const record of records) {
      insComponent.run(
        record.name,
        record.tier,
        record.category,
        record.renderEnv,
        JSON.stringify(record),
      );
      insFts.run(record.name, searchText(record));
      const vector = vectors?.get(record.name);
      if (vector) insVector.run(record.name, vectorToBlob(vector));
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  } finally {
    db.close();
  }
}

export interface Catalog {
  /** Hybrid search: FTS5 lexical fused with cosine when `queryVec` is given, else lexical only. */
  search(query: string, queryVec?: Float32Array, limit?: number): ComponentRecord[];
  get(name: string): ComponentRecord | undefined;
  list(): ComponentSummary[];
  listByTier(tier: Tier): ComponentRecord[];
  filterByRenderEnv(renderEnv: RenderEnv): ComponentRecord[];
  close(): void;
}

/** Turn free text into a safe FTS5 prefix-OR query, or undefined if it has no terms.
 *  Tokens are `[a-z0-9]+` by construction, so no quote-escaping is needed. */
function toFtsQuery(raw: string): string | undefined {
  const tokens = raw.toLowerCase().match(/[a-z0-9]+/g);
  if (!tokens || tokens.length === 0) return undefined;
  return tokens.map((token) => `"${token}"*`).join(' OR ');
}

const WEIGHT_LEXICAL = 0.45;
const WEIGHT_SEMANTIC = 0.55;
const FUSED_FLOOR = 0.05; // drop near-zero hybrid matches

export function openCatalog(dbPath: string): Catalog {
  const db = new DatabaseSync(dbPath, { readOnly: true });

  // Load records + vectors into memory once (the catalog is small); SQLite serves FTS5 MATCH.
  const records: ComponentRecord[] = db
    .prepare(`SELECT data FROM components ORDER BY tier, name`)
    .all()
    .map((row) => parseRecord(row.data));
  const byName = new Map(records.map((record) => [record.name.toLowerCase(), record]));
  const vectors = new Map<string, Float32Array>(
    db
      .prepare(`SELECT name, embedding FROM vectors`)
      .all()
      .map((row): [string, Float32Array] => [
        String(row.name),
        blobToVector(row.embedding as Uint8Array),
      ]),
  );
  const ftsStmt = db.prepare(
    `SELECT components_fts.name AS name, bm25(components_fts) AS score
     FROM components_fts WHERE components_fts MATCH ? ORDER BY score LIMIT ?`,
  );

  function lexicalHits(query: string, limit: number): LexHit[] {
    const match = toFtsQuery(query);
    if (!match) return [];
    return ftsStmt
      .all(match, limit)
      .map((row) => ({ name: String(row.name), score: Number(row.score) }));
  }

  return {
    search(query, queryVec, limit = 20) {
      const lex = lexicalHits(query, 50);

      // Lexical-only: no query vector or no stored vectors.
      if (!queryVec || vectors.size === 0) {
        return lex
          .slice(0, limit)
          .map((hit) => byName.get(hit.name.toLowerCase()))
          .filter((record): record is ComponentRecord => record !== undefined);
      }

      // Normalize bm25 (more-negative = better) to 0..1 across the lexical hits.
      const lexNorm = new Map<string, number>();
      if (lex.length > 0) {
        const scores = lex.map((hit) => -hit.score);
        const min = Math.min(...scores);
        const max = Math.max(...scores);
        for (const hit of lex) {
          lexNorm.set(hit.name, max === min ? 1 : (-hit.score - min) / (max - min));
        }
      }

      return records
        .map((record) => {
          const vector = vectors.get(record.name);
          const semantic = vector ? Math.max(0, cosine(queryVec, vector)) : 0;
          const lexical = lexNorm.get(record.name) ?? 0;
          return { record, score: WEIGHT_SEMANTIC * semantic + WEIGHT_LEXICAL * lexical };
        })
        .filter((scored) => scored.score > FUSED_FLOOR)
        .toSorted((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((scored) => scored.record);
    },
    get(name) {
      return byName.get(name.toLowerCase());
    },
    list() {
      return records.map(({ name, tier, description }) => ({ name, tier, description }));
    },
    listByTier(tier) {
      return records.filter((record) => record.tier === tier);
    },
    filterByRenderEnv(renderEnv) {
      return records.filter((record) => record.renderEnv === renderEnv);
    },
    close() {
      db.close();
    },
  };
}
