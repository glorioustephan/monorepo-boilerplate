import type { Meta, StoryObj } from '@storybook/react-vite';

import StatsSectionExample from '../../examples/StatsSection.example';
import { StatsSection } from './StatsSection';

const meta = {
  title: 'Blocks/StatsSection',
  component: StatsSection,
  args: { stats: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StatsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StatsSectionExample />,
};

export const NoTitle: Story = {
  render: () => (
    <StatsSection
      stats={[
        { label: 'Deployments today', value: '12,400', unit: '+' },
        { label: 'Avg. build time', value: '42', unit: 's' },
        { label: 'Packages shipped', value: '300', unit: '+' },
      ]}
    />
  ),
};
