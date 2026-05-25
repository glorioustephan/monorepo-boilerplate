import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { EmptyState } from '../recipes';
import { renderWithTheme } from '../test-utils';
import { ListPageTemplate } from './ListPageTemplate';

describe('ListPageTemplate', () => {
  it('renders the page heading and body', () => {
    renderWithTheme(
      <ListPageTemplate title="Invoices" description="All invoices">
        <div>list body</div>
      </ListPageTemplate>,
    );
    expect(screen.getByRole('heading', { name: 'Invoices' })).toBeInTheDocument();
    expect(screen.getByText('All invoices')).toBeInTheDocument();
    expect(screen.getByText('list body')).toBeInTheDocument();
  });

  it('renders actions, toolbar, and pagination slots', () => {
    renderWithTheme(
      <ListPageTemplate
        title="Invoices"
        actions={<Button>New</Button>}
        toolbar={<div>filters</div>}
        pagination={<div>pager</div>}
      >
        <EmptyState title="No invoices" />
      </ListPageTemplate>,
    );
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
    expect(screen.getByText('filters')).toBeInTheDocument();
    expect(screen.getByText('pager')).toBeInTheDocument();
    expect(screen.getByText('No invoices')).toBeInTheDocument();
  });
});
