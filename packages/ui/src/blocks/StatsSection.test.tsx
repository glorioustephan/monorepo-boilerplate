import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { StatsSection } from './StatsSection';

const STATS = [
  { label: 'Customers', value: '8,000', unit: '+' },
  { label: 'Uptime', value: '99.9', unit: '%' },
  { label: 'Countries', value: '40', unit: '+' },
] as const;

describe('StatsSection', () => {
  it('renders all stat values and labels', () => {
    renderWithTheme(<StatsSection stats={STATS} />);
    expect(screen.getByText('8,000')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('99.9')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
  });

  it('renders units', () => {
    renderWithTheme(<StatsSection stats={STATS} />);
    const plusSigns = screen.getAllByText('+');
    expect(plusSigns.length).toBe(2);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders title and description', () => {
    renderWithTheme(
      <StatsSection stats={STATS} title="By the numbers" description="Real traction." />,
    );
    expect(screen.getByRole('heading', { name: 'By the numbers' })).toBeInTheDocument();
    expect(screen.getByText('Real traction.')).toBeInTheDocument();
  });

  it('renders without title or description', () => {
    renderWithTheme(<StatsSection stats={STATS} />);
    expect(screen.queryByRole('heading')).toBeNull();
  });
});
