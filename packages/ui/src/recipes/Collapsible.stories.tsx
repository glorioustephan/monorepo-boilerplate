import { Flex, Text } from '@monorepo-boilerplate/ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import CollapsibleExample from '../../examples/Collapsible.example';
import { Collapsible } from './Collapsible';

const meta = {
  title: 'Recipes/Collapsible',
  component: Collapsible,
  args: { trigger: 'Toggle', children: 'Hidden content' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CollapsibleExample />,
};

export const ClosedByDefault: Story = {
  render: () => (
    <Collapsible
      trigger={({ open }) => (
        <Flex align="center" justify="between" gap="3" py="2" width="100%">
          <Text weight="medium">Show advanced options</Text>
          <ChevronDownIcon style={{ transform: open ? 'rotate(180deg)' : undefined }} />
        </Flex>
      )}
    >
      <Text as="p" color="gray" size="2">
        These options are collapsed until the trigger is activated.
      </Text>
    </Collapsible>
  ),
  /** Proves the CSS-only disclosure toggles `aria-expanded` on click. */
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /show advanced options/i });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};
