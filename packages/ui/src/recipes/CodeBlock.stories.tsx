import type { Meta, StoryObj } from '@storybook/react-vite';

import CodeBlockExample from '../../examples/CodeBlock.example';
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from './CodeBlock';
import { Text } from '../components';

const SAMPLE_CODE = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

const meta = {
  title: 'Recipes/Chat/CodeBlock',
  component: CodeBlock,
  args: {
    children: (
      <>
        <CodeBlockGroup>
          <Text size="1" color="gray" style={{ padding: '8px 16px' }}>
            greet.ts
          </Text>
        </CodeBlockGroup>
        <CodeBlockCode code={SAMPLE_CODE} language="ts" />
      </>
    ),
  },
  render: (args) => <CodeBlock {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default — a TypeScript snippet in a Group with a filename label and copy button. */
export const Default: Story = {
  render: () => <CodeBlockExample />,
};

/** Args-driven — edit children in the Controls panel. */
export const Controlled: Story = {};

/** Plain code with no group header. */
export const NoHeader: Story = {
  render: () => (
    <CodeBlock>
      <CodeBlockCode code={`const x = 1 + 2;\nconsole.log(x); // 3`} language="js" />
    </CodeBlock>
  ),
};

/** JSX example. */
export const JSX: Story = {
  render: () => (
    <CodeBlock>
      <CodeBlockGroup>
        <Text size="1" color="gray" style={{ padding: '8px 16px' }}>
          Button.tsx
        </Text>
      </CodeBlockGroup>
      <CodeBlockCode
        code={`export function Button({ children }: { children: React.ReactNode }) {
  return <button type="button">{children}</button>;
}`}
        language="tsx"
      />
    </CodeBlock>
  ),
};
