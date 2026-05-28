import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import type { ChatMessage } from '../types';
import { Chatbot } from './Chatbot';

// ---------------------------------------------------------------------------
// Mock streamer
// ---------------------------------------------------------------------------

async function* mockStream(chunks: readonly string[]): AsyncIterable<string> {
  for (const chunk of chunks) {
    yield chunk;
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
}

const SEEDED: readonly ChatMessage[] = [
  { id: '1', role: 'user', content: 'Hello there' },
  { id: '2', role: 'assistant', content: 'Hi! How can I help you today?' },
];

const SUGGESTIONS = ['Tell me a joke', 'Explain quantum computing'];

describe('Chatbot', () => {
  it('renders the composer textarea', () => {
    renderWithTheme(<Chatbot />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders seeded messages', () => {
    renderWithTheme(<Chatbot initialMessages={SEEDED} />);
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('Hi! How can I help you today?')).toBeInTheDocument();
  });

  it('shows the empty state heading when there are no messages', () => {
    renderWithTheme(<Chatbot suggestions={SUGGESTIONS} />);
    expect(screen.getByText('How can I help?')).toBeInTheDocument();
  });

  it('shows suggestion pills in the empty state', () => {
    renderWithTheme(<Chatbot suggestions={SUGGESTIONS} />);
    expect(screen.getByRole('button', { name: 'Tell me a joke' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explain quantum computing' })).toBeInTheDocument();
  });

  it('clicking a suggestion prefills the composer', () => {
    renderWithTheme(<Chatbot suggestions={SUGGESTIONS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tell me a joke' }));
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Tell me a joke');
  });

  it('renders the send button', () => {
    renderWithTheme(<Chatbot />);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });

  it('typing in the composer and clicking send appends a user turn and then an assistant turn', async () => {
    const onSend = (_text: string) => mockStream(['Hello back!']);
    renderWithTheme(<Chatbot onSend={onSend} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hi assistant' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    // User turn appears
    expect(screen.getByText('Hi assistant')).toBeInTheDocument();

    // Assistant turn streams in
    await waitFor(() => {
      expect(screen.getByText('Hello back!')).toBeInTheDocument();
    });
  });

  it('shows stop button while streaming', async () => {
    // A slow stream so we can catch the in-progress state
    async function* slowStream(): AsyncIterable<string> {
      yield 'part one ';
      await new Promise<void>((resolve) => setTimeout(resolve, 5_000));
      yield 'part two';
    }

    renderWithTheme(<Chatbot onSend={() => slowStream()} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'go' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Stop generation' })).toBeInTheDocument();
    });
  });

  it('renders with pre-seeded messages and no empty state', () => {
    renderWithTheme(<Chatbot initialMessages={SEEDED} suggestions={SUGGESTIONS} />);
    // Empty state heading should NOT be visible since there are messages
    expect(screen.queryByText('How can I help?')).not.toBeInTheDocument();
  });
});
