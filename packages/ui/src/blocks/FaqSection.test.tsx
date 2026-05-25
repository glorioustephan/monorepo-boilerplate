import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { FaqSection } from './FaqSection';

const ITEMS = [
  {
    id: 'trial',
    question: 'Do you offer a free trial?',
    answer: 'Yes — every plan includes a 14-day free trial.',
  },
  {
    id: 'billing',
    question: 'How does billing work?',
    answer: 'You are billed monthly or annually.',
  },
] as const;

describe('FaqSection', () => {
  it('renders all questions', () => {
    renderWithTheme(<FaqSection items={ITEMS} />);
    expect(screen.getByText('Do you offer a free trial?')).toBeInTheDocument();
    expect(screen.getByText('How does billing work?')).toBeInTheDocument();
  });

  it('answers are wired to the collapsible content region', () => {
    renderWithTheme(<FaqSection items={ITEMS} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    // Each trigger button has aria-controls pointing at a content element
    for (const btn of buttons) {
      const contentId = btn.getAttribute('aria-controls');
      expect(contentId).toBeTruthy();
      expect(document.getElementById(contentId!)).toBeInTheDocument();
    }
  });

  it('toggles an answer open and closed', () => {
    renderWithTheme(<FaqSection items={ITEMS} />);
    const [firstButton] = screen.getAllByRole('button');

    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(firstButton!);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(firstButton!);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders an optional title heading', () => {
    renderWithTheme(<FaqSection items={ITEMS} title="Common questions" />);
    expect(screen.getByRole('heading', { name: 'Common questions' })).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    renderWithTheme(<FaqSection items={ITEMS} description="Everything you need to know." />);
    expect(screen.getByText('Everything you need to know.')).toBeInTheDocument();
  });

  it('omits the header block when neither title nor description is provided', () => {
    renderWithTheme(<FaqSection items={ITEMS} />);
    expect(screen.queryByRole('heading')).toBeNull();
  });
});
