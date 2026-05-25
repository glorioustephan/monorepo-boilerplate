import type { Meta, StoryObj } from '@storybook/react-vite';

import CtaExample from '../../examples/Cta.example';
import { Cta } from './Cta';

const meta = {
  title: 'Blocks/Cta',
  component: Cta,
  args: { title: 'Ready to build?' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Cta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CtaExample />,
};
