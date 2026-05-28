import type { Meta, StoryObj } from '@storybook/react-vite';

import MarkdownExample from '../../examples/Markdown.example';
import { Markdown } from './Markdown';

const meta = {
  title: 'Recipes/Chat/Markdown',
  component: Markdown,
  args: {
    children: `## Hello\n\nThis is **bold**, \`inline code\`, and a [link](https://example.com).\n\n- Item one\n- Item two`,
  },
  render: (args) => <Markdown {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default — heading, paragraph with bold/inline-code/link, and a bullet list. */
export const Default: Story = {
  render: () => <MarkdownExample />,
};

/** Args-driven — edit children in the Controls panel. */
export const Controlled: Story = {};

/** Fenced code block delegated to CodeBlock for syntax highlighting. */
export const WithCodeBlock: Story = {
  args: {
    children: `### Example\n\n\`\`\`ts\nconst greet = (name: string) => \`Hello, \${name}!\`;\n\`\`\``,
  },
};

/** GFM table rendering via Radix Table atoms. */
export const WithTable: Story = {
  args: {
    children: `| Name | Status |\n|------|--------|\n| Alice | Active |\n| Bob | Inactive |`,
  },
};

/** Blockquote rendering. */
export const WithBlockquote: Story = {
  args: {
    children: `> This is an important note.\n>\n> It spans multiple lines.`,
  },
};
