import { Button, Flex, Popover, TextArea } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Overlays/Popover',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">Add comment</Button>
      </Popover.Trigger>
      <Popover.Content width="360px">
        <Flex direction="column" gap="3">
          <TextArea placeholder="Write a comment…" />
          <Flex gap="3" justify="end">
            <Popover.Close>
              <Button size="1">Comment</Button>
            </Popover.Close>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ),
};
