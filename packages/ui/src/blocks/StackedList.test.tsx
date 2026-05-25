import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { StackedList } from './StackedList';
import type { StackedListItem } from './StackedList';

const items: readonly StackedListItem[] = [
  {
    id: '1',
    title: 'Alice Chen',
    description: 'alice@example.com',
    meta: <span>Admin</span>,
    trailing: <button type="button">Actions</button>,
  },
  {
    id: '2',
    title: 'Bob Martinez',
    description: 'bob@example.com',
  },
];

describe('StackedList', () => {
  it('renders all item titles', () => {
    renderWithTheme(<StackedList items={items} />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    renderWithTheme(<StackedList items={items} />);
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('renders meta and trailing slots', () => {
    renderWithTheme(<StackedList items={items} />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument();
  });

  it('renders an anchor when href is set', () => {
    renderWithTheme(
      <StackedList
        items={[{ id: '1', title: 'Home', description: 'Landing page', href: '/home' }]}
      />,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
  });

  it('renders nothing when items is empty', () => {
    const { container } = renderWithTheme(<StackedList items={[]} />);
    // The root Flex renders but contains no row content
    expect(container.querySelectorAll('[data-separator]')).toHaveLength(0);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
