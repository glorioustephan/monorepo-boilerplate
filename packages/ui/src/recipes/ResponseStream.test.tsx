import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ResponseStream } from './ResponseStream';

describe('ResponseStream', () => {
  it('eventually renders the full typewriter text', async () => {
    renderWithTheme(<ResponseStream textStream="Hello world" mode="typewriter" speed={100} />);
    // At max speed the hook resolves quickly; await the final text appearing.
    await waitFor(() => expect(screen.getByText('Hello world')).toBeInTheDocument(), {
      timeout: 5000,
    });
  });

  it('eventually renders full text in fade mode', async () => {
    renderWithTheme(<ResponseStream textStream="Fade in text" mode="fade" speed={100} />);
    // In fade mode the full text is set once; each word gets its own span.
    // Await any span containing "Fade" to appear.
    await waitFor(
      () => {
        const container = document.querySelector('[aria-live="polite"]');
        expect(container?.textContent).toContain('Fade');
        expect(container?.textContent).toContain('text');
      },
      { timeout: 5000 },
    );
  });

  it('calls onComplete after streaming finishes', async () => {
    const onComplete = vi.fn();
    renderWithTheme(
      <ResponseStream textStream="Done" mode="typewriter" speed={100} onComplete={onComplete} />,
    );
    await waitFor(() => expect(onComplete).toHaveBeenCalledOnce(), { timeout: 5000 });
  });

  it('renders an aria-live polite region', () => {
    renderWithTheme(<ResponseStream textStream="" />);
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it('streams an AsyncIterable', async () => {
    async function* makeStream() {
      yield 'Async ';
      yield 'stream ';
      yield 'works';
    }

    renderWithTheme(<ResponseStream textStream={makeStream()} mode="typewriter" speed={100} />);
    await waitFor(
      () => {
        const container = document.querySelector('[aria-live="polite"]');
        expect(container?.textContent).toContain('Async stream works');
      },
      { timeout: 5000 },
    );
  });
});
