import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders the label and value', () => {
    renderWithTheme(<StatCard label="Total Subscribers" value="71,897" />);
    expect(screen.getByText('Total Subscribers')).toBeInTheDocument();
    expect(screen.getByText('71,897')).toBeInTheDocument();
  });

  it('renders the unit when provided', () => {
    renderWithTheme(<StatCard label="Open Rate" value="58.16" unit="%" />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders an up-trend badge', () => {
    renderWithTheme(
      <StatCard label="Subscribers" value="1,000" delta={{ value: '12%', trend: 'up' }} />,
    );
    expect(screen.getByText('↑ 12%')).toBeInTheDocument();
  });

  it('renders a down-trend badge', () => {
    renderWithTheme(
      <StatCard label="Churn" value="3.2" unit="%" delta={{ value: '4.05%', trend: 'down' }} />,
    );
    expect(screen.getByText('↓ 4.05%')).toBeInTheDocument();
  });

  it('renders a neutral-trend badge', () => {
    renderWithTheme(
      <StatCard label="Sessions" value="5,820" delta={{ value: '0%', trend: 'neutral' }} />,
    );
    expect(screen.getByText('→ 0%')).toBeInTheDocument();
  });

  it('omits the delta section when delta is not provided', () => {
    renderWithTheme(<StatCard label="Revenue" value="12,400" />);
    expect(screen.queryByText(/[↑↓→]/)).not.toBeInTheDocument();
  });

  it('renders an icon slot', () => {
    renderWithTheme(<StatCard label="Users" value="900" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
