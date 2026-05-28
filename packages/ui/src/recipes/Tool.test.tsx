import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Tool } from './Tool';

describe('Tool', () => {
  it('renders the tool type', () => {
    renderWithTheme(<Tool toolPart={{ type: 'search_web', state: 'input-streaming' }} />);
    expect(screen.getByText('search_web')).toBeInTheDocument();
  });

  it('shows "Processing" badge for input-streaming state', () => {
    renderWithTheme(<Tool toolPart={{ type: 'search_web', state: 'input-streaming' }} />);
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('shows "Ready" badge for input-available state', () => {
    renderWithTheme(<Tool toolPart={{ type: 'search_web', state: 'input-available' }} />);
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });

  it('shows "Completed" badge for output-available state', () => {
    renderWithTheme(<Tool toolPart={{ type: 'search_web', state: 'output-available' }} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows "Error" badge for output-error state', () => {
    renderWithTheme(<Tool toolPart={{ type: 'search_web', state: 'output-error' }} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('reveals input/output when expanded (defaultOpen)', () => {
    renderWithTheme(
      <Tool
        defaultOpen
        toolPart={{
          type: 'search_web',
          state: 'output-available',
          input: { query: 'pizza' },
          output: { count: 5 },
        }}
      />,
    );
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  it('clicking the trigger expands the collapsible', () => {
    renderWithTheme(
      <Tool
        toolPart={{
          type: 'search_web',
          state: 'output-available',
          input: { query: 'pizza' },
          output: { count: 5 },
        }}
      />,
    );
    // The collapsible toggle button has aria-expanded; select it explicitly.
    const trigger = screen.getByRole('button', { name: /search_web/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders error text in the error state', () => {
    renderWithTheme(
      <Tool
        defaultOpen
        toolPart={{
          type: 'search_web',
          state: 'output-error',
          errorText: 'Network timeout.',
        }}
      />,
    );
    expect(screen.getByText('Network timeout.')).toBeInTheDocument();
  });
});
