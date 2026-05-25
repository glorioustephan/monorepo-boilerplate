import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Project Nero' },
] as const;

describe('Breadcrumb', () => {
  it('renders a nav landmark with accessible label', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
  });

  it('renders the current page item as text, not a link', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    expect(screen.queryByRole('link', { name: 'Project Nero' })).not.toBeInTheDocument();
    expect(screen.getByText('Project Nero')).toBeInTheDocument();
  });

  it('marks the last item with aria-current="page"', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    const current = screen.getByText('Project Nero');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('renders a custom separator', () => {
    renderWithTheme(<Breadcrumb items={items} separator={<span data-testid="sep">/</span>} />);
    const separators = screen.getAllByTestId('sep');
    // 3 items → 2 separators
    expect(separators).toHaveLength(2);
  });
});
