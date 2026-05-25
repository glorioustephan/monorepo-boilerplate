/**
 * node:sqlite catalog store. `buildCatalog` writes the DB at build time (FTS5 for
 * lexical search + a reserved `vectors` table for the future MiniLM semantic layer);
 * `openCatalog` opens it read-only at runtime and exposes query helpers.
 *
 * Requires Node ≥22.5 run with `--experimental-sqlite` (set on the server bin / via
 * NODE_OPTIONS).
 */
import { DatabaseSync } from "node:sqlite";

import type { ComponentRecord, ComponentSummary, RenderEnv, Tier } from "./schema";

const parseRecord = (data: unknown): ComponentRecord => JSON.parse(String(data)) as ComponentRecord;

/** Concatenated searchable text for the FTS5 index. */
function searchText(record: ComponentRecord): string {
  const variants = (record.variants ?? [])
    .map((variant) => `${variant.prop} ${variant.values.join(" ")}`)
    .join(" ");
  const parts = (record.parts ?? []).join(" ");
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
    .join(" ");
}

/** Create/overwrite the catalog database from the given records. */
export function buildCatalog(dbPath: string, records: readonly ComponentRecord[]): void {
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
    CREATE TABLE vectors (name TEXT PRIMARY KEY, embedding BLOB);
  `);

  const insComponent = db.prepare(
    `INSERT INTO components (name, tier, category, render_env, data) VALUES (?, ?, ?, ?, ?)`,
  );
  const insFts = db.prepare(`INSERT INTO components_fts (name, text) VALUES (?, ?)`);
  for (const record of records) {
    insComponent.run(
      record.name,
      record.tier,
      record.category,
      record.renderEnv,
      JSON.stringify(record),
    );
    insFts.run(record.name, searchText(record));
  }
  db.close();
}

export interface Catalog {
  /** Lexical (FTS5/bm25) search, best matches first. */
  search(query: string, limit?: number): ComponentRecord[];
  get(name: string): ComponentRecord | undefined;
  list(): ComponentSummary[];
  listByTier(tier: Tier): ComponentRecord[];
  filterByRenderEnv(renderEnv: RenderEnv): ComponentRecord[];
  close(): void;
}

/** Turn free text into a safe FTS5 prefix-OR query, or undefined if it has no terms. */
function toFtsQuery(raw: string): string | undefined {
  const tokens = raw.toLowerCase().match(/[a-z0-9]+/g);
  if (!tokens || tokens.length === 0) return undefined;
  return tokens.map((token) => `"${token}"*`).join(" OR ");
}

export function openCatalog(dbPath: string): Catalog {
  const db = new DatabaseSync(dbPath, { readOnly: true });

  return {
    search(query, limit = 20) {
      const match = toFtsQuery(query);
      if (!match) return [];
      return db
        .prepare(
          `SELECT c.data AS data, bm25(components_fts) AS score
           FROM components_fts JOIN components c ON c.name = components_fts.name
           WHERE components_fts MATCH ? ORDER BY score LIMIT ?`,
        )
        .all(match, limit)
        .map((row) => parseRecord(row.data));
    },
    get(name) {
      const row = db.prepare(`SELECT data FROM components WHERE name = ? COLLATE NOCASE`).get(name);
      return row ? parseRecord(row.data) : undefined;
    },
    list() {
      return db
        .prepare(`SELECT data FROM components ORDER BY tier, name`)
        .all()
        .map((row) => {
          const { name, tier, description } = parseRecord(row.data);
          return { name, tier, description };
        });
    },
    listByTier(tier) {
      return db
        .prepare(`SELECT data FROM components WHERE tier = ? ORDER BY name`)
        .all(tier)
        .map((row) => parseRecord(row.data));
    },
    filterByRenderEnv(renderEnv) {
      return db
        .prepare(`SELECT data FROM components WHERE render_env = ? ORDER BY name`)
        .all(renderEnv)
        .map((row) => parseRecord(row.data));
    },
    close() {
      db.close();
    },
  };
}
