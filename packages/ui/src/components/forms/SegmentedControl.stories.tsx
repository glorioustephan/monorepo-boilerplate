import { SegmentedControl } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/SegmentedControl',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SegmentedControl.Root defaultValue="inbox">
      <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
      <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
      <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
};
