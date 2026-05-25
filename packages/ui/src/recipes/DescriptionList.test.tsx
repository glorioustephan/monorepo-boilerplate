import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { DescriptionList } from './DescriptionList';

describe('DescriptionList', () => {
  const items = [
    { term: 'Full name', value: 'Alex Johnson' },
    { term: 'Email', value: 'alex.johnson@example.com' },
    { term: 'Role', value: 'Admin' },
  ];

  it('renders all terms and values', () => {
    renderWithTheme(<DescriptionList items={items} />);
    expect(screen.getByText('Full name')).toBeInTheDocument();
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('alex.johnson@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders with vertical orientation', () => {
    renderWithTheme(<DescriptionList items={items} orientation="vertical" />);
    expect(screen.getByText('Full name')).toBeInTheDocument();
  });

  it('renders with horizontal orientation', () => {
    renderWithTheme(<DescriptionList items={items} orientation="horizontal" />);
    expect(screen.getByText('Full name')).toBeInTheDocument();
  });

  it('renders ReactNode terms and values', () => {
    renderWithTheme(
      <DescriptionList items={[{ term: <strong>Status</strong>, value: <em>Active</em> }]} />,
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders an empty list without error', () => {
    renderWithTheme(<DescriptionList items={[]} />);
  });
});
