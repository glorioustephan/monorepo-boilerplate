import type { Meta, StoryObj } from '@storybook/react-vite';

import BentoGridExample from '../../examples/BentoGrid.example';
import { BentoGrid } from './BentoGrid';

const meta = {
  title: 'Blocks/BentoGrid',
  component: BentoGrid,
  args: { items: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BentoGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BentoGridExample />,
};

export const Uniform: Story = {
  render: () => (
    <BentoGrid
      items={[
        { id: 'u1', title: 'Alpha', description: 'First feature of the product.' },
        { id: 'u2', title: 'Beta', description: 'Second feature of the product.' },
        { id: 'u3', title: 'Gamma', description: 'Third feature of the product.' },
        { id: 'u4', title: 'Delta', description: 'Fourth feature of the product.' },
        { id: 'u5', title: 'Epsilon', description: 'Fifth feature of the product.' },
        { id: 'u6', title: 'Zeta', description: 'Sixth feature of the product.' },
      ]}
    />
  ),
};
