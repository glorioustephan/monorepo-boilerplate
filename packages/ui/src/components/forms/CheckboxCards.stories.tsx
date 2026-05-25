import { CheckboxCards, Flex, Text } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/CheckboxCards',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CheckboxCards.Root defaultValue={['1']} columns={{ initial: '1', sm: '2' }}>
      <CheckboxCards.Item value="1">
        <Flex direction="column" width="100%">
          <Text weight="bold">A1 Keyboard</Text>
          <Text>US Layout</Text>
        </Flex>
      </CheckboxCards.Item>
      <CheckboxCards.Item value="2">
        <Flex direction="column" width="100%">
          <Text weight="bold">Pro Mouse</Text>
          <Text>Zero-lag wireless</Text>
        </Flex>
      </CheckboxCards.Item>
    </CheckboxCards.Root>
  ),
};
