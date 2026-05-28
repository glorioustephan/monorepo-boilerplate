import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ToolCalling, type ToolCallingMessage } from './ToolCalling';

const RICH_MESSAGES: readonly ToolCallingMessage[] = [
  { id: 'u1', role: 'user', content: 'What is the weather?' },
  {
    id: 'a1',
    role: 'assistant',
    content: 'The weather is **18 °C** and partly cloudy.',
    reasoning: 'I need to call the weather API to answer this question.',
    steps: ['Identify city coordinates', 'Call weather API', 'Format response'],
    tools: [
      {
        type: 'get_weather',
        state: 'output-available',
        toolCallId: 'call-1',
        input: { city: 'Paris' },
        output: { temp: 18 },
      },
      {
        type: 'get_forecast',
        state: 'output-error',
        toolCallId: 'call-2',
        input: { city: 'Paris' },
        errorText: 'Service unavailable.',
      },
    ],
  },
];

describe('ToolCalling', () => {
  it('renders the composer textarea', () => {
    renderWithTheme(<ToolCalling />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a seeded user turn', () => {
    renderWithTheme(<ToolCalling initialMessages={RICH_MESSAGES} />);
    expect(screen.getByText('What is the weather?')).toBeInTheDocument();
  });

  it('renders the Reasoning disclosure trigger', () => {
    renderWithTheme(<ToolCalling initialMessages={RICH_MESSAGES} />);
    // Reasoning renders a Collapsible whose trigger text is "Thinking…"
    expect(screen.getByText('Thinking…')).toBeInTheDocument();
  });

  it('renders Steps items', async () => {
    renderWithTheme(<ToolCalling initialMessages={RICH_MESSAGES} />);
    // Steps defaults to open — items should be visible
    await waitFor(() => {
      expect(screen.getByText('Identify city coordinates')).toBeInTheDocument();
      expect(screen.getByText('Call weather API')).toBeInTheDocument();
      expect(screen.getByText('Format response')).toBeInTheDocument();
    });
  });

  it('renders Tool blocks with correct type and status badge', () => {
    renderWithTheme(<ToolCalling initialMessages={RICH_MESSAGES} />);
    // Tool type names appear as Code elements
    expect(screen.getByText('get_weather')).toBeInTheDocument();
    expect(screen.getByText('get_forecast')).toBeInTheDocument();
    // Status badges
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders the markdown assistant answer', async () => {
    renderWithTheme(<ToolCalling initialMessages={RICH_MESSAGES} />);
    await waitFor(() => {
      // "18 °C" is bold in markdown — rendered inside a <strong>
      expect(screen.getByText(/18 °C/)).toBeInTheDocument();
    });
  });

  it('renders the send button', () => {
    renderWithTheme(<ToolCalling />);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });
});
