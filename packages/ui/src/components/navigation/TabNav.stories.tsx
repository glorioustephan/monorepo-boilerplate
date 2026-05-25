import { TabNav } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Navigation/TabNav',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// TabNav renders <a> links for routing — `active` reflects the current route.
export const Default: Story = {
  render: () => (
    <TabNav.Root>
      <TabNav.Link href="#" active>
        Account
      </TabNav.Link>
      <TabNav.Link href="#">Documents</TabNav.Link>
      <TabNav.Link href="#">Settings</TabNav.Link>
    </TabNav.Root>
  ),
};
