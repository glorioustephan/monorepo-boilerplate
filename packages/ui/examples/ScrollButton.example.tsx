'use client';

import { Box, ChatContainer, Flex, ScrollButton, Text } from '@monorepo-boilerplate/ui';

const MESSAGES = [
  'The scroll button appears when you scroll up from the bottom of this container.',
  'It uses the StickToBottom context provided by ChatContainer.Root.',
  'Clicking it will snap the view back to the bottom.',
  'The button fades out automatically once you are at the bottom.',
  'Try scrolling up to see the transition.',
  'The data-at-bottom attribute drives the CSS opacity/translate animation.',
  'No motion library is needed — pure CSS handles the transition.',
  'This pattern is common in AI chat interfaces.',
];

/**
 * ScrollButton sits inside a ChatContainer.Root and reveals itself when the user scrolls up.
 */
export default function ScrollButtonExample() {
  return (
    <Box style={{ height: 400 }}>
      <ChatContainer.Root style={{ height: '100%', position: 'relative' }}>
        <ChatContainer.Content>
          <Flex direction="column" gap="3" p="4">
            {MESSAGES.map((text) => (
              <Box
                key={text}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-4)',
                  background: 'var(--gray-a3)',
                }}
              >
                <Text size="2">{text}</Text>
              </Box>
            ))}
          </Flex>
          <ChatContainer.ScrollAnchor />
        </ChatContainer.Content>

        {/* Pinned inside Root so it can read the StickToBottom context; absolute children of the
            scroll container stay fixed in the corner rather than scrolling with the content. */}
        <Box position="absolute" style={{ bottom: 12, right: 12 }}>
          <ScrollButton />
        </Box>
      </ChatContainer.Root>
    </Box>
  );
}
