import type { Meta, StoryObj } from '@storybook/react-vite';

import FeatureGridExample from '../../examples/FeatureGrid.example';
import { FeatureGrid } from './FeatureGrid';

const meta = {
  title: 'Blocks/FeatureGrid',
  component: FeatureGrid,
  args: { features: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FeatureGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FeatureGridExample />,
};
