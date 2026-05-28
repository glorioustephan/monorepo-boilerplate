import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { MessageThread } from './MessageThread';

const MESSAGES = [
  { id: '1', role: 'user' as const, content: 'Hello there' },
  {
    id: '2',
    role: 'assistant' as const,
    content: '## Hi!\n\nHere is a **list**:\n- item one\n- item two',
  },
  { id: '3', role: 'system' as const, content: 'Context limit reached.' },
];

describe('MessageThread', () => {
  it('renders user message text', () => {
    renderWithTheme(<MessageThread messages={MESSAGES} />);
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });

  it('renders assistant content as markdown — heading', async () => {
    renderWithTheme(<MessageThread messages={MESSAGES} />);
    // Markdown renders "## Hi!" as a heading element
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /hi/i })).toBeInTheDocument();
    });
  });

  it('renders assistant content as markdown — list items', async () => {
    renderWithTheme(<MessageThread messages={MESSAGES} />);
    await waitFor(() => {
      expect(screen.getByText('item one')).toBeInTheDocument();
      expect(screen.getByText('item two')).toBeInTheDocument();
    });
  });

  it('renders system turn via SystemMessage', () => {
    renderWithTheme(<MessageThread messages={MESSAGES} />);
    expect(screen.getByText('Context limit reached.')).toBeInTheDocument();
  });

  it('shows a loader on the last assistant turn when isStreaming', () => {
    renderWithTheme(
      <MessageThread
        isStreaming
        messages={[
          { id: '1', role: 'user', content: 'Go' },
          { id: '2', role: 'assistant', content: 'Working…' },
        ]}
      />,
    );
    // VisuallyHidden "Loading" label is present from the Loader component
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('does not show a loader when isStreaming is false', () => {
    renderWithTheme(
      <MessageThread
        messages={[
          { id: '1', role: 'user', content: 'Hi' },
          { id: '2', role: 'assistant', content: 'Done.' },
        ]}
      />,
    );
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('uses renderMessage escape hatch when provided', () => {
    renderWithTheme(
      <MessageThread
        messages={[{ id: '1', role: 'user', content: 'Override me' }]}
        renderMessage={(m) => <span data-testid="custom">{m.content}</span>}
      />,
    );
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('renders nothing meaningful for an empty messages array', () => {
    renderWithTheme(<MessageThread messages={[]} />);
    // No user text, no assistant text, no system message
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });
});
