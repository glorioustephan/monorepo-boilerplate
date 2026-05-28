'use client';

import { CopyIcon, ThickArrowUpIcon } from '@radix-ui/react-icons';

import { IconButton, Message, MessageAvatar, MessageContent } from '@monorepo-boilerplate/ui';

const ASSISTANT_MARKDOWN = `Here is how you can fetch data in a React Server Component:

\`\`\`tsx
async function Page() {
  const data = await fetch('/api/data').then((r) => r.json());
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
\`\`\`

No \`useEffect\` needed — the component runs on the server.`;

/**
 * Message demonstrates an assistant turn with an avatar, markdown content, and
 * action buttons, followed by a plain user turn.
 */
export default function MessageExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
      {/* Assistant turn */}
      <Message>
        <Message.Avatar
          src="https://api.dicebear.com/7.x/bottts/svg?seed=assistant"
          alt="Assistant"
          fallback="AI"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
          <Message.Content markdown>{ASSISTANT_MARKDOWN}</Message.Content>
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

      {/* User turn */}
      <Message>
        <MessageAvatar
          src="https://api.dicebear.com/7.x/personas/svg?seed=user"
          alt="You"
          fallback="U"
        />
        <MessageContent>How do I fetch data in a Server Component?</MessageContent>
      </Message>
    </div>
  );
}
