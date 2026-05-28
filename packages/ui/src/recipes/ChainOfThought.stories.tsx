import type { Meta, StoryObj } from '@storybook/react-vite';

import ChainOfThoughtExample from '../../examples/ChainOfThought.example';
import { ChainOfThought } from './ChainOfThought';

const meta = {
  title: 'Recipes/Chat/ChainOfThought',
  component: ChainOfThought,
  args: {
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChainOfThought>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Three-step chain — last step open, connector hidden on last step. */
export const Default: Story = {
  render: () => <ChainOfThoughtExample />,
};

/** Single step chain — no connector shown (only step is also the last). */
export const SingleStep: Story = {
  render: () => (
    <ChainOfThought>
      <ChainOfThought.Step defaultOpen>
        <ChainOfThought.Trigger>Draft answer</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>Only one step in this chain.</ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>
    </ChainOfThought>
  ),
};

/** All steps start open for scanning. */
export const AllOpen: Story = {
  render: () => (
    <ChainOfThought>
      <ChainOfThought.Step defaultOpen>
        <ChainOfThought.Trigger>Search the web</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>Found 12 results.</ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>
      <ChainOfThought.Step defaultOpen>
        <ChainOfThought.Trigger>Analyse results</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>Ranked by recency.</ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>
      <ChainOfThought.Step defaultOpen>
        <ChainOfThought.Trigger>Draft answer</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>Compiled a concise summary.</ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>
    </ChainOfThought>
  ),
};
