import { Box, Kbd, TextField } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/TextField',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box maxWidth="320px">
      <TextField.Root placeholder="Search the docs…">
        <TextField.Slot side="right">
          <Kbd>⌘ K</Kbd>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box maxWidth="320px">
      {(['1', '2', '3'] as const).map((size) => (
        <Box key={size} mb="2">
          <TextField.Root size={size} placeholder={`Size ${size}`} />
        </Box>
      ))}
    </Box>
  ),
};
