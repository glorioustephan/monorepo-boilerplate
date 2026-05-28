import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useChat } from './useChat';

// ---------------------------------------------------------------------------
// Mock streamer — an async generator that yields deterministic chunks.
// ---------------------------------------------------------------------------

async function* mockStream(chunks: readonly string[]): AsyncIterable<string> {
  for (const chunk of chunks) {
    yield chunk;
    // Allow React to batch between yields.
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
}

describe('useChat', () => {
  it('initialises with empty messages and input', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toHaveLength(0);
    expect(result.current.input).toBe('');
    expect(result.current.isStreaming).toBe(false);
  });

  it('seeds messages from initialMessages', () => {
    const initial = [{ id: '1', role: 'user' as const, content: 'Hello' }];
    const { result } = renderHook(() => useChat({ initialMessages: initial }));
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]?.content).toBe('Hello');
  });

  it('setInput updates the input value', () => {
    const { result } = renderHook(() => useChat());
    act(() => result.current.setInput('test'));
    expect(result.current.input).toBe('test');
  });

  it('send does nothing when input is blank', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useChat({ onSend }));
    act(() => result.current.send());
    expect(onSend).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });

  it('send appends a user turn then an assistant turn from a mock streamer', async () => {
    const chunks = ['Hello', ', ', 'world!'];
    const onSend = vi.fn((_text: string) => mockStream(chunks));

    const { result } = renderHook(() => useChat({ onSend }));

    act(() => result.current.setInput('Hi'));
    act(() => result.current.send());

    // User turn is appended immediately.
    expect(result.current.messages[0]?.role).toBe('user');
    expect(result.current.messages[0]?.content).toBe('Hi');
    expect(result.current.isStreaming).toBe(true);

    // Wait for the full stream to complete.
    await waitFor(() => expect(result.current.isStreaming).toBe(false));

    const msgs = result.current.messages;
    expect(msgs).toHaveLength(2);
    expect(msgs[1]?.role).toBe('assistant');
    expect(msgs[1]?.content).toBe('Hello, world!');
    expect(result.current.input).toBe('');
  });

  it('isStreaming toggles true during streaming and false after', async () => {
    const onSend = vi.fn((_text: string) => mockStream(['chunk']));
    const { result } = renderHook(() => useChat({ onSend }));

    act(() => result.current.setInput('ping'));
    act(() => result.current.send());

    expect(result.current.isStreaming).toBe(true);

    await waitFor(() => expect(result.current.isStreaming).toBe(false));
  });

  it('stop aborts in-flight streaming', async () => {
    // A stream that yields one chunk then waits "forever".
    async function* slowStream(): AsyncIterable<string> {
      yield 'partial';
      await new Promise<void>((resolve) => setTimeout(resolve, 10_000));
      yield 'never';
    }

    const { result } = renderHook(() => useChat({ onSend: () => slowStream() }));

    act(() => result.current.setInput('go'));
    act(() => result.current.send());

    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === 'assistant');
      return assistant !== undefined;
    });

    act(() => result.current.stop());

    expect(result.current.isStreaming).toBe(false);
  });

  it('handles one-shot string response from onSend', async () => {
    const onSend = vi.fn(() => 'direct reply');
    const { result } = renderHook(() => useChat({ onSend }));

    act(() => result.current.setInput('hello'));
    act(() => result.current.send());

    await waitFor(() => expect(result.current.isStreaming).toBe(false));

    const assistant = result.current.messages.find((m) => m.role === 'assistant');
    expect(assistant?.content).toBe('direct reply');
  });
});
