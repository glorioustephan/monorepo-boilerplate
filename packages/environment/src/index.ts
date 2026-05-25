import type { z } from 'zod';

/**
 * Re-exported so apps define their typed env in one place:
 *
 *   export const env = createEnv({ server: {...}, client: {...}, runtimeEnv: process.env });
 */
export { createEnv } from '@t3-oss/env-nextjs';

export interface DoctorReport {
  readonly ok: boolean;
  readonly checks: readonly EnvCheck[];
}

export interface EnvCheck {
  readonly key: string;
  readonly status: 'ok' | 'missing' | 'invalid';
  readonly message?: string;
}

/**
 * Non-throwing health check over a map of env-var schemas. Unlike `createEnv`
 * (which throws on the first invalid value), this validates every key and
 * returns a per-variable report — ideal for a CLI `env:doctor` command.
 */
export function checkEnv(
  schemas: Readonly<Record<string, z.ZodType>>,
  source: Readonly<Record<string, string | undefined>> = process.env,
): DoctorReport {
  const checks: EnvCheck[] = [];

  for (const [key, schema] of Object.entries(schemas)) {
    const raw = source[key];
    const parsed = schema.safeParse(raw);

    if (parsed.success) {
      checks.push({ key, status: 'ok' });
      continue;
    }

    const present = raw !== undefined && raw !== '';
    checks.push({
      key,
      status: present ? 'invalid' : 'missing',
      message: parsed.error.issues[0]?.message,
    });
  }

  return { ok: checks.every((check) => check.status === 'ok'), checks };
}

/** Pretty-print a {@link DoctorReport} to the console and return its `ok` flag. */
export function printDoctorReport(report: DoctorReport): boolean {
  // Intentional stdout: this helper is the CLI face of `env:doctor`.
  const log = console.log;
  log('\nEnvironment doctor\n');
  for (const check of report.checks) {
    const mark = check.status === 'ok' ? '✓' : '✗';
    const detail = check.message ? ` — ${check.message}` : '';
    log(`  [${mark}] ${check.key}: ${check.status}${detail}`);
  }
  log(
    report.ok ? '\nAll environment variables look good.\n' : '\nSome variables need attention.\n',
  );
  return report.ok;
}
