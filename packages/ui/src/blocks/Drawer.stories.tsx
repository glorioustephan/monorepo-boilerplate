import { Button, Drawer, Flex, Text } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import DrawerExample from '../../examples/Drawer.example';

const meta = {
  title: 'Blocks/Drawer',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DrawerExample />,
  /** Proves the trigger opens the panel, which renders into a Dialog portal. */
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Edit profile' }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('dialog')).toBeInTheDocument();
    await expect(body.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  },
};

export const LeftSide: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger>
        <Button>Open filters</Button>
      </Drawer.Trigger>
      <Drawer.Content side="left" title="Filters">
        <Flex direction="column" gap="2">
          <Text>Filter content goes here.</Text>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  ),
};
