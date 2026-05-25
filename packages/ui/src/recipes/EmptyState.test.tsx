import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title as a heading', () => {
    renderWithTheme(<EmptyState title="No projects yet" />);
    expect(screen.getByRole('heading', { name: 'No projects yet' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    renderWithTheme(<EmptyState title="Empty" description="Create one to get started." />);
    expect(screen.getByText('Create one to get started.')).toBeInTheDocument();
  });

  it('renders the action slot', () => {
    renderWithTheme(<EmptyState title="Empty" action={<Button>New item</Button>} />);
    expect(screen.getByRole('button', { name: 'New item' })).toBeInTheDocument();
  });

  it('renders the icon slot', () => {
    renderWithTheme(<EmptyState title="Empty" icon={<span data-testid="empty-icon" />} />);
    expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    renderWithTheme(<EmptyState title="Empty" />);
    expect(screen.queryByText(/started/i)).not.toBeInTheDocument();
  });
});
