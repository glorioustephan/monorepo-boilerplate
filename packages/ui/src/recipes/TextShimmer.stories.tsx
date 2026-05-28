import type { Meta, StoryObj } from '@storybook/react-vite';

import TextShimmerExample from '../../examples/TextShimmer.example';
import { TextShimmer } from './TextShimmer';

const meta = {
  title: 'Recipes/Chat/TextShimmer',
  component: TextShimmer,
  args: {
    children: 'Generating response…',
    duration: 4,
    spread: 20,
  },
  render: (args) => <TextShimmer {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TextShimmer>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit children/duration/spread in the Controls panel. */
export const Default: Story = {
  render: () => <TextShimmerExample />,
};

/** Slow, wide shimmer — for long, decorative headings. */
export const SlowWide: Story = {
  args: {
    children: 'Crafting the perfect answer…',
    duration: 8,
    spread: 35,
  },
};

/** Fast, tight shimmer — for compact status labels. */
export const FastTight: Story = {
  args: {
    children: 'Thinking…',
    duration: 2,
    spread: 10,
  },
};

/** Renders as a heading element via the `as` prop. */
export const AsHeading: Story = {
  args: {
    children: 'Generating your report',
    as: 'h3',
    duration: 4,
    spread: 20,
  },
};
