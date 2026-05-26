import type { Meta, StoryObj } from '@storybook/react-vite';

import StatsSectionExample from '../../examples/StatsSection.example';
import { StatsSection } from './StatsSection';

const meta = {
  title: 'Blocks/StatsSection',
  component: StatsSection,
  args: {
    title: 'Trusted by teams worldwide',
    description: 'Numbers that reflect the real-world adoption of the boilerplate.',
    columns: { initial: '1', sm: '3' },
    stats: [
      { label: 'Active customers', value: '8,000', unit: '+' },
      { label: 'Uptime', value: '99.9', unit: '%' },
      { label: 'Countries', value: '40', unit: '+' },
    ],
  },
  render: (args) => <StatsSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StatsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, stats, and columns in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <StatsSectionExample />,
};

export const NoTitle: Story = {
  args: {
    title: undefined,
    description: undefined,
    stats: [
      { label: 'Deployments today', value: '12,400', unit: '+' },
      { label: 'Avg. build time', value: '42', unit: 's' },
      { label: 'Packages shipped', value: '300', unit: '+' },
    ],
  },
};
