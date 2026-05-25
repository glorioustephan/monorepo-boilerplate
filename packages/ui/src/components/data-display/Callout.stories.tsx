import { Callout } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Data Display/Callout',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Callout.Root>
      {/* Callout.Icon slots any icon node; a glyph keeps the kit icon-library-agnostic. */}
      <Callout.Icon>ℹ︎</Callout.Icon>
      <Callout.Text>
        You will need admin privileges to install and access this application.
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Colors: Story = {
  render: () => (
    <Callout.Root color="red">
      <Callout.Icon>⚠︎</Callout.Icon>
      <Callout.Text>Access denied. Please contact the network administrator.</Callout.Text>
    </Callout.Root>
  ),
};
