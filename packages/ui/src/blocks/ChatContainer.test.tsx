import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ChatContainer } from './ChatContainer';

describe('ChatContainer', () => {
  it('renders a log region with role="log"', () => {
    renderWithTheme(
      <ChatContainer.Root>
        <ChatContainer.Content>
          <p>Message one</p>
          <ChatContainer.ScrollAnchor />
        </ChatContainer.Content>
      </ChatContainer.Root>,
    );
    expect(screen.getByRole('log')).toBeInTheDocument();
  });

  it('renders children inside the log region', () => {
    renderWithTheme(
      <ChatContainer.Root>
        <ChatContainer.Content>
          <p>Hello world</p>
          <ChatContainer.ScrollAnchor />
        </ChatContainer.Content>
      </ChatContainer.Root>,
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders the scroll anchor with aria-hidden', () => {
    const { container } = renderWithTheme(
      <ChatContainer.Root>
        <ChatContainer.Content>
          <ChatContainer.ScrollAnchor />
        </ChatContainer.Content>
      </ChatContainer.Root>,
    );
    const anchor = container.querySelector('[aria-hidden="true"]');
    expect(anchor).toBeInTheDocument();
  });

  it('exposes standalone ChatContainerRoot export', async () => {
    const { ChatContainerRoot } = await import('./ChatContainer');
    expect(typeof ChatContainerRoot).toBe('function');
  });
});
