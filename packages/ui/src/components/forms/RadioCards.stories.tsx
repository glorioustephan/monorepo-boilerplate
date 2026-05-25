import { Flex, RadioCards, Text } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/RadioCards',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioCards.Root defaultValue="1" columns={{ initial: '1', sm: '3' }}>
      <RadioCards.Item value="1">
        <Flex direction="column" width="100%">
          <Text weight="bold">8-core CPU</Text>
          <Text>32 GB RAM</Text>
        </Flex>
      </RadioCards.Item>
      <RadioCards.Item value="2">
        <Flex direction="column" width="100%">
          <Text weight="bold">6-core CPU</Text>
          <Text>24 GB RAM</Text>
        </Flex>
      </RadioCards.Item>
      <RadioCards.Item value="3">
        <Flex direction="column" width="100%">
          <Text weight="bold">4-core CPU</Text>
          <Text>16 GB RAM</Text>
        </Flex>
      </RadioCards.Item>
    </RadioCards.Root>
  ),
};
