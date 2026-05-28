import type { Meta, StoryObj } from '@storybook/react-vite';

import SystemMessageExample from '../../examples/SystemMessage.example';
import { SystemMessage } from './SystemMessage';

const meta = {
  title: 'Recipes/Chat/SystemMessage',
  component: SystemMessage,
  args: {
    children: 'This is a system notification from the assistant.',
    variant: 'action',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SystemMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** All three variants with a CTA. Mirrors the catalog example. */
export const Default: Story = {
  render: () => <SystemMessageExample />,
};

/** `action` variant — gray, info icon, with a call-to-action. */
export const Action: Story = {
  args: {
    variant: 'action',
    cta: { label: 'Learn more', onClick: () => undefined },
    children: 'The assistant searched the web and found 4 relevant sources.',
  },
};

/** `error` variant — red, cross icon. */
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while calling the tool. Please try again.',
  },
};

/** `warning` variant — amber, triangle icon. */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'The response may be incomplete due to a context length limit.',
  },
};

/** Icon hidden — no leading glyph. */
export const IconHidden: Story = {
  args: {
    variant: 'action',
    isIconHidden: true,
    children: 'A plain system message without an icon.',
  },
};
