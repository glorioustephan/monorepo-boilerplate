import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { GridList } from './GridList';
import type { GridListItem } from './GridList';

const items: readonly GridListItem[] = [
  {
    id: '1',
    media: <span>avatar-1</span>,
    title: 'Alice Chen',
    description: 'Senior Product Designer',
    meta: <span>alice@example.com</span>,
  },
  {
    id: '2',
    title: 'Bob Martinez',
    description: 'Staff Engineer',
  },
];

describe('GridList', () => {
  it('renders all item titles', () => {
    renderWithTheme(<GridList items={items} />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    renderWithTheme(<GridList items={items} />);
    expect(screen.getByText('Senior Product Designer')).toBeInTheDocument();
    expect(screen.getByText('Staff Engineer')).toBeInTheDocument();
  });

  it('renders the media slot', () => {
    renderWithTheme(<GridList items={items} />);
    expect(screen.getByText('avatar-1')).toBeInTheDocument();
  });

  it('renders the meta slot', () => {
    renderWithTheme(<GridList items={items} />);
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('wraps the card in a link when href is provided', () => {
    renderWithTheme(
      <GridList items={[{ id: '1', title: 'Home', description: 'Landing page', href: '/home' }]} />,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
  });

  it('renders no links when href is absent', () => {
    renderWithTheme(<GridList items={items} />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders nothing when items is empty', () => {
    const { container } = renderWithTheme(<GridList items={[]} />);
    expect(container.querySelectorAll('article, [data-radix-card]')).toHaveLength(0);
  });
});
