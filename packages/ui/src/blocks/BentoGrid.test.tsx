import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { BentoGrid } from './BentoGrid';

describe('BentoGrid', () => {
  const items = [
    {
      id: 'item-1',
      title: 'Ship Faster',
      description: 'Turborepo remote caching.',
      colSpan: 2 as const,
    },
    { id: 'item-2', title: 'Type-Safe', description: 'Strict TypeScript everywhere.' },
    {
      id: 'item-3',
      title: 'Secure',
      description: 'Env validation out of the box.',
      rowSpan: 2 as const,
    },
  ];

  it('renders a heading per item', () => {
    renderWithTheme(<BentoGrid items={items} />);
    expect(screen.getByRole('heading', { name: 'Ship Faster' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Type-Safe' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Secure' })).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderWithTheme(<BentoGrid items={items} />);
    expect(screen.getByText('Turborepo remote caching.')).toBeInTheDocument();
  });

  it('renders without crashing when items is empty', () => {
    renderWithTheme(<BentoGrid items={[]} />);
  });

  it('renders items with no title or description', () => {
    renderWithTheme(<BentoGrid items={[{ id: 'media-only', media: <div>Media</div> }]} />);
    expect(screen.getByText('Media')).toBeInTheDocument();
  });
});
