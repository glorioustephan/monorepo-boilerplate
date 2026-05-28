import type { Meta, StoryObj } from '@storybook/react-vite';

import SourceExample from '../../examples/Source.example';
import { Source } from './Source';

const meta = {
  title: 'Recipes/Chat/Source',
  component: Source,
  // href and children are required — satisfy them at the meta level so each Story inherits.
  args: {
    href: 'https://react.dev',
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Source>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Two inline citations — one with a favicon, one without. Mirrors the catalog example. */
export const Default: Story = {
  render: () => <SourceExample />,
};

/** A single citation chip without favicon. */
export const NoFavicon: Story = {
  render: () => (
    <Source href="https://nextjs.org">
      <Source.Trigger label="Next.js" />
      <Source.Content
        title="Next.js — The React Framework"
        description="Production-grade React applications that scale."
      />
    </Source>
  ),
};

/** A citation chip with a favicon shown inline. */
export const WithFavicon: Story = {
  render: () => (
    <Source href="https://tailwindcss.com">
      <Source.Trigger showFavicon />
      <Source.Content
        title="Tailwind CSS — Rapidly build modern websites"
        description="A utility-first CSS framework packed with classes."
      />
    </Source>
  ),
};
