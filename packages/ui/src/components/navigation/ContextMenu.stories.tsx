import { ContextMenu, Flex, Text } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Navigation/ContextMenu',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Flex
          align="center"
          justify="center"
          width="240px"
          height="120px"
          style={{ border: '1px dashed var(--gray-a7)', borderRadius: 'var(--radius-3)' }}
        >
          <Text color="gray" size="2">
            Right-click here
          </Text>
        </Flex>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item shortcut="⌘ C">Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="⌘ V">Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item color="red" shortcut="⌘ ⌫">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
};
