import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { SidebarNav } from './SidebarNav';
import type { SidebarNavItem, SidebarNavSection } from './SidebarNav';

const plainItems: readonly SidebarNavItem[] = [
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

const collapsibleItems: readonly SidebarNavItem[] = [
  { label: 'General', href: '/settings/general' },
  { label: 'Security', href: '/settings/security' },
];

const sections: readonly SidebarNavSection[] = [
  {
    label: 'Navigation',
    items: plainItems,
  },
  {
    label: 'Settings',
    items: collapsibleItems,
    collapsible: true,
    defaultOpen: true,
  },
];

describe('SidebarNav', () => {
  it('renders a nav landmark', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all nav item labels', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /team/i })).toHaveAttribute('href', '/team');
  });

  it('renders the icon slot', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByText('icon-dashboard')).toBeInTheDocument();
  });

  it('renders the badge slot', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders section headings', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders header and footer slots', () => {
    renderWithTheme(
      <SidebarNav sections={[]} header={<span>My Brand</span>} footer={<span>User Footer</span>} />,
    );
    expect(screen.getByText('My Brand')).toBeInTheDocument();
    expect(screen.getByText('User Footer')).toBeInTheDocument();
  });

  it('renders collapsible section items when defaultOpen', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('collapses a section when the trigger is clicked', () => {
    renderWithTheme(<SidebarNav sections={sections} />);
    // The collapsible trigger button holds the section label for the collapsible section
    const trigger = screen.getByRole('button', { name: /settings/i });
    // Items are visible before collapse
    expect(screen.getByText('General')).toBeInTheDocument();
    fireEvent.click(trigger);
    // After collapse, content is hidden (aria-expanded becomes false)
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
