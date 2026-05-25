import { Button } from '@monorepo-boilerplate/ui';
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

export const Panel: Story = {
  render: () => (
    <Cta
      variant="panel"
      title="Ready to build?"
      description="Fork the boilerplate and ship your first feature in minutes."
      actions={
        <>
          <Button size="3">Get started</Button>
          <Button size="3" variant="soft">
            Star on GitHub
          </Button>
        </>
      }
    />
  ),
};
