import { Avatar, Flex, Heading, HoverCard, Link, Text } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Overlays/HoverCard',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Text>
      Follow{' '}
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Link href="#">@radix_ui</Link>
        </HoverCard.Trigger>
        <HoverCard.Content maxWidth="300px">
          <Flex gap="4">
            <Avatar size="3" fallback="R" radius="full" />
            <Flex direction="column" gap="1">
              <Heading size="3">Radix</Heading>
              <Text size="2">UI components for building accessible web apps.</Text>
            </Flex>
          </Flex>
        </HoverCard.Content>
      </HoverCard.Root>{' '}
      for updates.
    </Text>
  ),
};
