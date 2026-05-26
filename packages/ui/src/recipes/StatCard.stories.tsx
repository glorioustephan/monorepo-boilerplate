import type { Meta, StoryObj } from '@storybook/react-vite';

import StatCardExample from '../../examples/StatCard.example';
import { StatCard } from './StatCard';

const meta = {
  title: 'Recipes/StatCard',
  component: StatCard,
  args: {
    label: 'Monthly Revenue',
    value: '12,400',
    unit: 'MRR',
    delta: { value: '8%', trend: 'up' },
  },
  render: (args) => <StatCard {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit label/value/unit/delta.trend in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <StatCardExample />,
};

export const WithUnit: Story = {
  args: {
    label: 'Monthly Revenue',
    value: '12,400',
    unit: 'MRR',
    delta: { value: '8%', trend: 'up' },
  },
};

export const TrendDown: Story = {
  args: {
    label: 'Churn Rate',
    value: '3.2',
    unit: '%',
    delta: { value: '0.4%', trend: 'down' },
  },
};

export const Neutral: Story = {
  args: {
    label: 'Sessions',
    value: '5,820',
    unit: undefined,
    delta: { value: '0%', trend: 'neutral' },
  },
};
