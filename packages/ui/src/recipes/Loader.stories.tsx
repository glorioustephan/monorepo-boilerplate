import type { Meta, StoryObj } from '@storybook/react-vite';

import LoaderExample from '../../examples/Loader.example';
import { Loader } from './Loader';

const meta = {
  title: 'Recipes/Chat/Loader',
  component: Loader,
  args: {
    variant: 'circular',
    size: '2',
    text: 'Thinking',
  },
  render: (args) => <Loader {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** All ten variants shown in a grid — good light/dark QA surface. */
export const Default: Story = {
  render: () => <LoaderExample />,
};

/** Args-driven — switch variant/size/text in the Controls panel. */
export const Controlled: Story = {};

export const Dots: Story = { args: { variant: 'dots' } };
export const Typing: Story = { args: { variant: 'typing' } };
export const Wave: Story = { args: { variant: 'wave' } };
export const Bars: Story = { args: { variant: 'bars' } };
export const Terminal: Story = { args: { variant: 'terminal' } };
export const TextBlink: Story = { args: { variant: 'text-blink', text: 'Thinking' } };
export const TextShimmer: Story = {
  args: { variant: 'text-shimmer', text: 'Generating response…' },
};
export const LoadingDots: Story = { args: { variant: 'loading-dots', text: 'Thinking' } };
