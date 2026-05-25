import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { SidebarNav } from '../blocks/SidebarNav';
import { DashboardTemplate } from './DashboardTemplate';

const sidebar = <SidebarNav sections={[{ items: [{ label: 'Dashboard', href: '/dashboard' }] }]} />;

describe('DashboardTemplate', () => {
  it('renders children inside the main content area', () => {
    renderWithTheme(
      <DashboardTemplate sidebar={sidebar}>
        <p>Main content</p>
      </DashboardTemplate>,
    );
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders the header slot when provided', () => {
    renderWithTheme(
      <DashboardTemplate sidebar={sidebar} header={<nav>Top bar</nav>}>
        <p>Body</p>
      </DashboardTemplate>,
    );
    expect(screen.getByText('Top bar')).toBeInTheDocument();
  });

  it('omits the header slot when not provided', () => {
    // Plain sidebar (no nav of its own) so we can assert the template adds no header nav.
    const { container } = renderWithTheme(
      <DashboardTemplate sidebar={<div>side</div>}>
        <p>Body only</p>
      </DashboardTemplate>,
    );
    expect(container.querySelector('nav')).toBeNull();
  });

  it('renders the sidebar slot', () => {
    renderWithTheme(
      <DashboardTemplate sidebar={<nav>Sidebar nav</nav>}>
        <p>Content</p>
      </DashboardTemplate>,
    );
    expect(screen.getByText('Sidebar nav')).toBeInTheDocument();
  });
});
