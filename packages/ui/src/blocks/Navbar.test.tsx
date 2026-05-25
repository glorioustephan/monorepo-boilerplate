import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { Navbar, NavbarMobileMenu } from './Navbar';

const links = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Team', href: '/team' },
] as const;

describe('Navbar', () => {
  it('renders brand content', () => {
    renderWithTheme(<Navbar brand={<span>Acme</span>} links={links} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });

  it('renders all nav links', () => {
    renderWithTheme(<Navbar brand="Brand" links={links} />);
    // Desktop nav + mobile nav both render links — at least one occurrence each
    expect(screen.getAllByRole('link', { name: 'Dashboard' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Team' }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders actions slot', () => {
    renderWithTheme(<Navbar brand="Brand" links={links} actions={<Button>Sign in</Button>} />);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('renders custom menuIcon', () => {
    renderWithTheme(<Navbar brand="Brand" links={links} menuIcon={<span>HamburgerIcon</span>} />);
    expect(screen.getByText('HamburgerIcon')).toBeInTheDocument();
  });
});

describe('NavbarMobileMenu', () => {
  it('renders the default trigger label when no icon provided', () => {
    renderWithTheme(<NavbarMobileMenu links={links} />);
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('renders a custom icon as trigger', () => {
    renderWithTheme(<NavbarMobileMenu links={links} icon={<span>custom-icon</span>} />);
    expect(screen.getByText('custom-icon')).toBeInTheDocument();
  });
});
