import { useCallback, useRef, useState } from 'react';

import type { ChatMessage } from '../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for the `useChat` hook. */
export interface UseChatOptions {
  /** Pre-seed the message thread with existing turns. */
  readonly initialMessages?: readonly ChatMessage[];
  /**
   * Called whenever the user sends a message. Return a string for a one-shot
   * response, an `AsyncIterable<string>` for a streaming response, or a Promise
   * that resolves to either. Omit to drive the hook from outside.
   */
  readonly onSend?: (
    text: string,
  ) => Promise<AsyncIterable<string> | string> | AsyncIterable<string> | string;
}

/** Stable surface returned by `useChat`. */
export interface UseChatResult {
  /** Ordered list of chat turns. */
  readonly messages: readonly ChatMessage[];
  /** Current value of the composer input. */
  readonly input: string;
  /** Update the composer input value. */
  readonly setInput: (value: string) => void;
  /** Push the user turn, call `onSend`, and stream the assistant reply. */
  readonly send: () => void;
  /** True while the assistant turn is being generated. */
  readonly isStreaming: boolean;
  /** Abort the in-flight stream. */
  readonly stop: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a stable id — uses `crypto.randomUUID` with a timestamp fallback. */
function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useChat — headless hook wiring a chat composer to an optional streaming back-end.
 * Transport-agnostic: `onSend` may return a plain string or an `AsyncIterable<string>`.
 * `send` appends a user turn, flips `isStreaming`, and grows an assistant turn chunk-by-chunk.
 * `stop` aborts the current in-flight stream via an `AbortController`.
 * Export from `src/recipes/index.ts`; consumed by the `Chatbot` and `ToolCalling` templates.
 * Keywords: chat, hook, streaming, messages, AI, composer, send, stop.
 */
export function useChat(options?: UseChatOptions): UseChatResult {
  const { initialMessages = [], onSend } = options ?? {};

  const [messages, setMessages] = useState<readonly ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text || isStreaming) return;

    // Append the user turn.
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Create a fresh abort controller for this request.
    const controller = new AbortController();
    abortRef.current = controller;

    const assistantId = generateId();

    const initialAssistant: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, initialAssistant]);

    async function run() {
      try {
        const result = await onSend?.(text);

        if (result === undefined || result === null) {
          // No onSend provided — leave the empty assistant turn.
          return;
        }

        if (typeof result === 'string') {
          // One-shot string response.
          if (!controller.signal.aborted) {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, content: result } : m)),
            );
          }
          return;
        }

        // AsyncIterable<string> — consume chunk by chunk.
        for await (const chunk of result) {
          if (controller.signal.aborted) break;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m)),
          );
        }
      } catch {
        // Swallow abort errors; surface nothing — the empty assistant turn remains.
      } finally {
        if (!controller.signal.aborted || abortRef.current === controller) {
          setIsStreaming(false);
          if (abortRef.current === controller) {
            abortRef.current = null;
          }
        }
      }
    }

    void run();
  }, [input, isStreaming, onSend]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  return { messages, input, setInput, send, isStreaming, stop };
}
