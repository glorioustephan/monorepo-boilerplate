import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge, Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { PageHeading } from './PageHeading';

describe('PageHeading', () => {
  it('renders the title as an h1', () => {
    renderWithTheme(<PageHeading title="Projects" />);
    expect(screen.getByRole('heading', { name: 'Projects', level: 1 })).toBeInTheDocument();
  });

  it('renders optional description', () => {
    renderWithTheme(<PageHeading title="Projects" description="Manage your projects." />);
    expect(screen.getByText('Manage your projects.')).toBeInTheDocument();
  });

  it('renders breadcrumbs slot', () => {
    renderWithTheme(
      <PageHeading title="Projects" breadcrumbs={<nav aria-label="breadcrumb">crumbs</nav>} />,
    );
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
  });

  it('renders meta slot', () => {
    renderWithTheme(<PageHeading title="Projects" meta={<Badge color="green">Active</Badge>} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    renderWithTheme(<PageHeading title="Projects" actions={<Button>New project</Button>} />);
    expect(screen.getByRole('button', { name: 'New project' })).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    const { container } = renderWithTheme(
      <PageHeading title="Projects" className="custom-class" />,
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
