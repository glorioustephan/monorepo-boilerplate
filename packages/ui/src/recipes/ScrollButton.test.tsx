import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ChatContainer } from '../blocks/ChatContainer';
import { ScrollButton } from './ScrollButton';

/** Wrap ScrollButton in ChatContainer.Root so the stick-to-bottom context is provided. */
function Wrapper() {
  return (
    <ChatContainer.Root style={{ height: 200 }}>
      <ChatContainer.Content>
        <div style={{ height: 600 }} />
        <ChatContainer.ScrollAnchor />
      </ChatContainer.Content>
      <ScrollButton />
    </ChatContainer.Root>
  );
}

describe('ScrollButton', () => {
  it('renders with the accessible label "Scroll to bottom"', () => {
    renderWithTheme(<Wrapper />);
    expect(screen.getByRole('button', { name: 'Scroll to bottom' })).toBeInTheDocument();
  });

  it('carries the mb-scroll-button class', () => {
    renderWithTheme(<Wrapper />);
    const btn = screen.getByRole('button', { name: 'Scroll to bottom' });
    expect(btn.className).toContain('mb-scroll-button');
  });

  it('exposes data-at-bottom attribute', () => {
    renderWithTheme(<Wrapper />);
    const btn = screen.getByRole('button', { name: 'Scroll to bottom' });
    expect(btn).toHaveAttribute('data-at-bottom');
  });
});
