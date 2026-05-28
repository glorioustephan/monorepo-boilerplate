'use client';

import { Box, ChatContainer, Flex, ScrollButton, Text } from '@monorepo-boilerplate/ui';

const MESSAGES = [
  { id: '1', role: 'user', text: 'Hello! Can you explain how React Server Components work?' },
  {
    id: '2',
    role: 'assistant',
    text: 'Sure! React Server Components (RSC) let you render components on the server, sending only the rendered output — not the JavaScript — to the client. This means zero client-side bundle cost for those components.',
  },
  { id: '3', role: 'user', text: 'How do they differ from SSR?' },
  {
    id: '4',
    role: 'assistant',
    text: 'With traditional SSR, components still ship their JS to the client for hydration. With RSC, server-only components never ship their code at all. Client Components still hydrate as usual — the two models compose cleanly.',
  },
  { id: '5', role: 'user', text: 'Can I mix them in the same tree?' },
  {
    id: '6',
    role: 'assistant',
    text: 'Yes! You can nest Client Components inside Server Components, and pass Server-rendered content as children to Client Components. The key rule: Server Components cannot import Client Components directly (but can receive them as slots).',
  },
  { id: '7', role: 'user', text: 'What about data fetching?' },
  {
    id: '8',
    role: 'assistant',
    text: 'Server Components can be async — you can await data fetches directly in the component body. No useEffect, no loading state boilerplate. The framework streams the result to the client as it resolves.',
  },
];

/**
 * ChatContainer wraps a message list in an auto-scrolling log region.
 * The ScrollButton appears when the user scrolls up and snaps back to the bottom on click.
 */
export default function ChatContainerExample() {
  return (
    <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ flex: 1, minHeight: 0 }}>
        <ChatContainer.Root style={{ height: '100%', position: 'relative' }}>
          <ChatContainer.Content>
            <Flex direction="column" gap="4" p="4">
              {MESSAGES.map((msg) => (
                <Flex key={msg.id} justify={msg.role === 'user' ? 'end' : 'start'}>
                  <Box
                    style={{
                      maxWidth: '70%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-4)',
                      background: msg.role === 'user' ? 'var(--accent-a3)' : 'var(--gray-a3)',
                    }}
                  >
                    <Text size="2">{msg.text}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
            <ChatContainer.ScrollAnchor />
          </ChatContainer.Content>

          {/* Pinned bottom-right inside Root so it can read the StickToBottom context. */}
          <Box position="absolute" style={{ bottom: 16, right: 16 }}>
            <ScrollButton />
          </Box>
        </ChatContainer.Root>
      </Box>
    </Box>
  );
}
