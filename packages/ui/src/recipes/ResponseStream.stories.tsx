import type { Meta, StoryObj } from '@storybook/react-vite';

import ResponseStreamExample from '../../examples/ResponseStream.example';
import { ResponseStream } from './ResponseStream';

const SAMPLE_TEXT =
  'Large language models work by predicting the next token in a sequence, given all prior context. ' +
  'Training on vast corpora teaches the model statistical patterns in language, which it generalises ' +
  'to answer questions, write code, or summarise documents.';

const meta = {
  title: 'Recipes/Chat/ResponseStream',
  component: ResponseStream,
  args: {
    textStream: SAMPLE_TEXT,
    mode: 'typewriter',
    speed: 40,
  },
  render: (args) => <ResponseStream {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ResponseStream>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Reference example showing both typewriter and fade modes. */
export const Default: Story = {
  render: () => <ResponseStreamExample />,
};

/** Typewriter mode — characters revealed character-by-character with a trailing cursor. */
export const Typewriter: Story = {
  args: {
    mode: 'typewriter',
    speed: 30,
  },
};

/** Fade mode — words fade in progressively using CSS keyframe animation. */
export const Fade: Story = {
  args: {
    mode: 'fade',
    speed: 30,
  },
};

/** Fast stream for when responsiveness matters over drama. */
export const HighSpeed: Story = {
  args: {
    mode: 'typewriter',
    speed: 90,
  },
};
