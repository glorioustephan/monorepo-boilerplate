import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { VerticalNav } from './VerticalNav';
import type { VerticalNavItem } from './VerticalNav';

const items: readonly VerticalNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <span>icon-dashboard</span>,
    active: true,
  },
  {
    label: 'Team',
    href: '/team',
    badge: <span>12</span>,
  },
  {
    label: 'Projects',
    href: '/projects',
  },
];

describe('VerticalNav', () => {
  it('renders all item labels', () => {
    renderWithTheme(<VerticalNav items={items} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    renderWithTheme(<VerticalNav items={items} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/dashboard');
    expect(links[1]).toHaveAttribute('href', '/team');
    expect(links[2]).toHaveAttribute('href', '/projects');
  });

  it('renders the icon slot', () => {
    renderWithTheme(<VerticalNav items={items} />);
    expect(screen.getByText('icon-dashboard')).toBeInTheDocument();
  });

  it('renders the badge slot', () => {
    renderWithTheme(<VerticalNav items={items} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders a nav landmark', () => {
    renderWithTheme(<VerticalNav items={items} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders nothing when items is empty', () => {
    renderWithTheme(<VerticalNav items={[]} />);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
