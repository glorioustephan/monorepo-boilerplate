import { GearIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import StepsExample from '../../examples/Steps.example';
import { Steps } from './Steps';

const meta = {
  title: 'Recipes/Chat/Steps',
  component: Steps,
  args: {
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default 3-step plan with a leading icon — mirrors the catalog example. */
export const Default: Story = {
  render: () => <StepsExample />,
};

/** Steps without a leading icon — trailing chevron only. */
export const NoLeadingIcon: Story = {
  render: () => (
    <Steps>
      <Steps.Trigger>Execution plan</Steps.Trigger>
      <Steps.Content>
        <Steps.Item>Search the web for recent papers.</Steps.Item>
        <Steps.Item>Summarise the top 5 results.</Steps.Item>
        <Steps.Item>Draft a concise answer with citations.</Steps.Item>
      </Steps.Content>
    </Steps>
  ),
};

/** Steps closed by default. */
export const ClosedByDefault: Story = {
  render: () => (
    <Steps defaultOpen={false}>
      <Steps.Trigger leftIcon={<GearIcon />}>Hidden plan</Steps.Trigger>
      <Steps.Content>
        <Steps.Item>This content is initially hidden.</Steps.Item>
      </Steps.Content>
    </Steps>
  ),
};
