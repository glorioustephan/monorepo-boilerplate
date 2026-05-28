import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { TextShimmer } from './TextShimmer';

describe('TextShimmer', () => {
  it('renders the text content', () => {
    renderWithTheme(<TextShimmer>Generating response…</TextShimmer>);
    expect(screen.getByText('Generating response…')).toBeInTheDocument();
  });

  it('applies the mb-shimmer class', () => {
    renderWithTheme(<TextShimmer>Hello</TextShimmer>);
    const el = screen.getByText('Hello');
    expect(el.classList.contains('mb-shimmer')).toBe(true);
  });

  it('sets CSS custom properties for duration and spread', () => {
    renderWithTheme(
      <TextShimmer duration={2} spread={30}>
        Test
      </TextShimmer>,
    );
    const el = screen.getByText('Test');
    expect(el).toHaveStyle({ '--mb-shimmer-duration': '2s' });
    expect(el).toHaveStyle({ '--mb-shimmer-spread': '30' });
  });

  it('clamps spread to 45 at the upper bound', () => {
    renderWithTheme(<TextShimmer spread={99}>Clamped</TextShimmer>);
    const el = screen.getByText('Clamped');
    expect(el).toHaveStyle({ '--mb-shimmer-spread': '45' });
  });

  it('clamps spread to 5 at the lower bound', () => {
    renderWithTheme(<TextShimmer spread={1}>Clamped</TextShimmer>);
    const el = screen.getByText('Clamped');
    expect(el).toHaveStyle({ '--mb-shimmer-spread': '5' });
  });

  it('renders as a custom element when as prop is provided', () => {
    renderWithTheme(<TextShimmer as="p">Paragraph shimmer</TextShimmer>);
    const el = screen.getByText('Paragraph shimmer');
    expect(el.tagName).toBe('P');
  });

  it('merges extra class names', () => {
    renderWithTheme(<TextShimmer className="font-medium">Styled</TextShimmer>);
    const el = screen.getByText('Styled');
    expect(el.classList.contains('font-medium')).toBe(true);
  });
});
