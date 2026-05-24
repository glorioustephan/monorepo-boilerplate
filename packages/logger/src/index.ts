/**
 * Tiny structured logger with zero dependencies.
 *
 * - Level-aware via the `LOG_LEVEL` env var (debug < info < warn < error).
 * - Emits one JSON object per line in production, a compact human-readable line
 *   otherwise (`NODE_ENV !== "production"`).
 * - Writes to **stderr by default**, which keeps it safe to use inside the MCP
 *   server (stdout there is the JSON-RPC channel). Override with `destination`.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export type LogFields = Record<string, unknown>;

export interface Logger {
  debug(message: string, fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
  /** Derive a child logger that always includes `fields`. */
  child(fields: LogFields): Logger;
}

export interface LoggerOptions {
  /** Minimum level to emit. Defaults to `LOG_LEVEL` env, else "info". */
  readonly level?: LogLevel;
  /** Force JSON output. Defaults to `NODE_ENV === "production"`. */
  readonly json?: boolean;
  /** Where to write. Defaults to `process.stderr`. */
  readonly destination?: { write(chunk: string): void };
  /** Fields merged into every line. */
  readonly base?: LogFields;
}

function resolveLevel(explicit?: LogLevel): LogLevel {
  if (explicit) return explicit;
  const fromEnv = process.env.LOG_LEVEL;
  if (fromEnv === "debug" || fromEnv === "info" || fromEnv === "warn" || fromEnv === "error") {
    return fromEnv;
  }
  return "info";
}

function format(
  json: boolean,
  level: LogLevel,
  name: string,
  message: string,
  fields: LogFields,
): string {
  const time = new Date().toISOString();
  if (json) {
    return `${JSON.stringify({ time, level, name, message, ...fields })}\n`;
  }
  const suffix = Object.keys(fields).length > 0 ? ` ${JSON.stringify(fields)}` : "";
  return `${time} ${level.toUpperCase().padEnd(5)} [${name}] ${message}${suffix}\n`;
}

/** Create a named logger. */
export function createLogger(name: string, options: LoggerOptions = {}): Logger {
  const minWeight = LEVEL_WEIGHT[resolveLevel(options.level)];
  const json = options.json ?? process.env.NODE_ENV === "production";
  const destination = options.destination ?? process.stderr;
  const base = options.base ?? {};

  function emit(level: LogLevel, message: string, fields?: LogFields): void {
    if (LEVEL_WEIGHT[level] < minWeight) return;
    destination.write(format(json, level, name, message, { ...base, ...fields }));
  }

  return {
    debug: (message, fields) => emit("debug", message, fields),
    info: (message, fields) => emit("info", message, fields),
    warn: (message, fields) => emit("warn", message, fields),
    error: (message, fields) => emit("error", message, fields),
    child: (fields) => createLogger(name, { ...options, base: { ...base, ...fields } }),
  };
}
