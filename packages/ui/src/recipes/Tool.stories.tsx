import type { Meta, StoryObj } from '@storybook/react-vite';

import ToolExample from '../../examples/Tool.example';
import { Tool } from './Tool';

const meta = {
  title: 'Recipes/Chat/Tool',
  component: Tool,
  args: {
    toolPart: {
      type: 'search_web',
      state: 'output-available' as const,
      input: { query: 'best pizza in Rome' },
      output: { results: ['Pizzarium', 'Il Sorpasso'], total: 2 },
      toolCallId: 'call_abc123',
    },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tool>;

export default meta;

type Story = StoryObj<typeof meta>;

/** All four lifecycle states — mirrors the catalog example. */
export const Default: Story = {
  render: () => <ToolExample />,
};

/** Single tool in the `input-streaming` (processing) state. */
export const InputStreaming: Story = {
  args: {
    toolPart: {
      type: 'search_web',
      state: 'input-streaming',
      input: { query: 'best pizza in Rome' },
    },
  },
};

/** Single tool in the `input-available` (ready) state. */
export const InputAvailable: Story = {
  args: {
    toolPart: {
      type: 'search_web',
      state: 'input-available',
      input: { query: 'best pizza in Rome' },
    },
  },
};

/** Single tool with expanded output. */
export const OutputAvailable: Story = {
  args: {
    defaultOpen: true,
    toolPart: {
      type: 'search_web',
      state: 'output-available',
      input: { query: 'best pizza in Rome' },
      output: { results: ['Pizzarium'], total: 1 },
      toolCallId: 'call_xyz',
    },
  },
};

/** Single tool in the error state. */
export const OutputError: Story = {
  args: {
    toolPart: {
      type: 'search_web',
      state: 'output-error',
      errorText: 'Network timeout — please retry.',
      toolCallId: 'call_err',
    },
  },
};
