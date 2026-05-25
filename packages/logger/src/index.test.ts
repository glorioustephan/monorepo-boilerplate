import { describe, expect, it } from 'vitest';

import { createLogger } from './index';

function capture() {
  const lines: string[] = [];
  return { destination: { write: (chunk: string) => void lines.push(chunk) }, lines };
}

describe('createLogger', () => {
  it('emits JSON lines when json is enabled', () => {
    const { destination, lines } = capture();
    const log = createLogger('test', { json: true, level: 'debug', destination });
    log.info('hello', { userId: 1 });
    expect(lines).toHaveLength(1);
    const parsed = JSON.parse(lines[0]!) as Record<string, unknown>;
    expect(parsed.level).toBe('info');
    expect(parsed.name).toBe('test');
    expect(parsed.message).toBe('hello');
    expect(parsed.userId).toBe(1);
  });

  it('filters messages below the configured level', () => {
    const { destination, lines } = capture();
    const log = createLogger('test', { level: 'warn', destination });
    log.debug('nope');
    log.info('nope');
    log.warn('yes');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('yes');
  });

  it('merges child fields into every line', () => {
    const { destination, lines } = capture();
    const log = createLogger('test', { json: true, destination }).child({ requestId: 'abc' });
    log.error('boom');
    const parsed = JSON.parse(lines[0]!) as Record<string, unknown>;
    expect(parsed.requestId).toBe('abc');
  });
});
