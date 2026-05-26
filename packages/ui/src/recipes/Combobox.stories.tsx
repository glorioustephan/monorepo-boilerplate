import { Box, Combobox, type ComboboxOption } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import ComboboxExample from '../../examples/Combobox.example';

const frameworks: readonly ComboboxOption[] = [
  { value: 'Next.js', label: 'Next.js', keywords: ['react'] },
  { value: 'Remix', label: 'Remix', keywords: ['react'] },
  { value: 'Astro', label: 'Astro' },
  { value: 'SvelteKit', label: 'SvelteKit', keywords: ['svelte'] },
  { value: 'Nuxt', label: 'Nuxt', keywords: ['vue'] },
];

const meta = {
  title: 'Recipes/Combobox',
  component: Combobox,
  args: { options: frameworks, placeholder: 'Search frameworks…' },
  render: (args) => (
    <Box width="320px">
      <Combobox {...args} />
    </Box>
  ),
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit `placeholder`/`defaultValue` in Controls; focus the input to filter. */
export const Default: Story = {
  /** Proves focus opens the list and typing filters it (keeping focus in the input). */
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await expect(canvas.getByRole('option', { name: 'Astro' })).toBeInTheDocument();
    await userEvent.type(input, 'rem');
    await expect(canvas.getByRole('option', { name: 'Remix' })).toBeInTheDocument();
    await expect(canvas.queryByRole('option', { name: 'Astro' })).not.toBeInTheDocument();
  },
};

/** Reference example: a labelled field with controlled value state. */
export const Example: Story = {
  render: () => <ComboboxExample />,
};
