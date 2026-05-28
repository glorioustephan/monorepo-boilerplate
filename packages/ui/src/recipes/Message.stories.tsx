import { CopyIcon, ThickArrowUpIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from '../components';
import MessageExample from '../../examples/Message.example';
import { Message } from './Message';

const meta = {
  title: 'Recipes/Chat/Message',
  component: Message,
  // `children` is required; provide a minimal default so stories that override `render` typecheck.
  args: {
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default story — mirrors the catalog example (assistant + user turns). */
export const Default: Story = {
  render: () => <MessageExample />,
};

/** Plain user turn — simple text bubble, no avatar or actions. */
export const UserTurn: Story = {
  render: () => (
    <Message>
      <Message.Avatar
        src="https://api.dicebear.com/7.x/personas/svg?seed=user"
        alt="You"
        fallback="U"
      />
      <Message.Content>How do I fetch data in a Server Component?</Message.Content>
    </Message>
  ),
};

/** Assistant turn with markdown content — headings, code, and action buttons. */
export const AssistantMarkdown: Story = {
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <Message>
        <Message.Avatar
          src="https://api.dicebear.com/7.x/bottts/svg?seed=assistant"
          alt="Assistant"
          fallback="AI"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
          <Message.Content markdown>
            {`## Answer\n\nUse \`async/await\` in a Server Component:\n\n\`\`\`tsx\nasync function Page() {\n  const data = await fetch('/api/data').then(r => r.json());\n  return <pre>{JSON.stringify(data)}</pre>;\n}\n\`\`\``}
          </Message.Content>
          <Message.Actions>
            <Message.Action tooltip="Copy message" side="top">
              <IconButton variant="ghost" size="1" aria-label="Copy message">
                <CopyIcon />
              </IconButton>
            </Message.Action>
            <Message.Action tooltip="Helpful" side="top">
              <IconButton variant="ghost" size="1" aria-label="Helpful">
                <ThickArrowUpIcon />
              </IconButton>
            </Message.Action>
          </Message.Actions>
        </div>
      </Message>
    </div>
  ),
};
