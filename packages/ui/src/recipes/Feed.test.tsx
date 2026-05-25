import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Feed } from './Feed';
import type { FeedItem } from './Feed';

const items: readonly FeedItem[] = [
  {
    id: 'applied',
    icon: <svg data-testid="icon-applied" />,
    content: 'Applied to the role.',
    timestamp: '3 days ago',
  },
  {
    id: 'screening',
    content: 'Advanced to phone screening.',
    timestamp: '2 days ago',
  },
  {
    id: 'interview',
    content: 'Completed interview.',
  },
];

describe('Feed', () => {
  it('renders all item content', () => {
    renderWithTheme(<Feed items={items} />);
    expect(screen.getByText('Applied to the role.')).toBeInTheDocument();
    expect(screen.getByText('Advanced to phone screening.')).toBeInTheDocument();
    expect(screen.getByText('Completed interview.')).toBeInTheDocument();
  });

  it('renders timestamps when provided', () => {
    renderWithTheme(<Feed items={items} />);
    expect(screen.getByText('3 days ago')).toBeInTheDocument();
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  it('omits timestamp element when not provided', () => {
    renderWithTheme(<Feed items={[{ id: '1', content: 'No timestamp.' }]} />);
    expect(screen.queryByText(/ago/)).not.toBeInTheDocument();
  });

  it('renders the icon slot when provided', () => {
    renderWithTheme(<Feed items={items} />);
    expect(screen.getByTestId('icon-applied')).toBeInTheDocument();
  });

  it('renders nothing when items is empty', () => {
    const { container } = renderWithTheme(<Feed items={[]} />);
    expect(container.querySelectorAll('[data-separator]')).toHaveLength(0);
  });
});
