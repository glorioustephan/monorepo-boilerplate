import type { Meta, StoryObj } from '@storybook/react-vite';

import StatCardExample from '../../examples/StatCard.example';
import { StatCard } from './StatCard';

const meta = {
  title: 'Recipes/StatCard',
  component: StatCard,
  args: { label: 'Metric', value: '1,234' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StatCardExample />,
};

export const WithUnit: Story = {
  render: () => (
    <StatCard
      label="Monthly Revenue"
      value="12,400"
      unit="MRR"
      delta={{ value: '8%', trend: 'up' }}
    />
  ),
};

export const TrendDown: Story = {
  render: () => (
    <StatCard label="Churn Rate" value="3.2" unit="%" delta={{ value: '0.4%', trend: 'down' }} />
  ),
};

export const Neutral: Story = {
  render: () => (
    <StatCard label="Sessions" value="5,820" delta={{ value: '0%', trend: 'neutral' }} />
  ),
};
