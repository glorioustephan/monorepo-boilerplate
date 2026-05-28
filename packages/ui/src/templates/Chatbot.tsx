'use client';

import { PaperPlaneIcon, StopIcon } from '@radix-ui/react-icons';

import { Flex, Heading, IconButton, Separator, Text } from '../components';
import { ChatContainer } from '../blocks/ChatContainer';
import { cn } from '../lib/cn';
import { Loader } from '../recipes/Loader';
import { MessageThread } from '../recipes/MessageThread';
import { PromptInput } from '../recipes/PromptInput';
import { PromptSuggestion } from '../recipes/PromptSuggestion';
import { ScrollButton } from '../recipes/ScrollButton';
import { useChat, type UseChatOptions } from '../recipes/useChat';

// ---------------------------------------------------------------------------
// Prop interface
// ---------------------------------------------------------------------------

/** Props for the Chatbot template. */
export interface ChatbotProps {
  /** Pre-seed the conversation with existing turns. */
  readonly initialMessages?: UseChatOptions['initialMessages'];
  /**
   * Called when the user sends a message. Return a string or `AsyncIterable<string>`
   * for a streaming reply. Omit to use the hook without a back-end (offline/demo).
   */
  readonly onSend?: UseChatOptions['onSend'];
  /** Prompt suggestion strings shown in the empty state. */
  readonly suggestions?: readonly string[];
  /** Placeholder text for the composer textarea. Defaults to `'Ask anything…'`. */
  readonly placeholder?: string;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({
  suggestions,
  onSelect,
}: {
  readonly suggestions: readonly string[];
  readonly onSelect: (text: string) => void;
}) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      flexGrow="1"
      style={{ minHeight: '200px' }}
    >
      <Flex direction="column" align="center" gap="1">
        <Heading size="5" align="center">
          How can I help?
        </Heading>
        <Text size="2" color="gray" align="center">
          Ask anything or pick a suggestion below.
        </Text>
      </Flex>
      {suggestions.length > 0 ? (
        <Flex wrap="wrap" gap="2" justify="center" style={{ maxWidth: 480 }}>
          {suggestions.map((s) => (
            <PromptSuggestion key={s} onClick={() => onSelect(s)}>
              {s}
            </PromptSuggestion>
          ))}
        </Flex>
      ) : null}
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// Chatbot
// ---------------------------------------------------------------------------

/**
 * Chatbot — full-page AI chat template. Wires `useChat` to a `ChatContainer` log,
 * a `MessageThread`, and a `PromptInput` composer. Shows an empty-state with
 * `PromptSuggestion` pills when no messages exist; auto-sticks to the bottom via
 * `ChatContainer`; surfaces a `ScrollButton` when scrolled up.
 * Use as a drop-in AI chat page shell.
 * Keywords: chatbot, chat, template, AI, composer, streaming, messages, suggestions.
 */
export function Chatbot({
  initialMessages,
  onSend,
  suggestions = [],
  placeholder = 'Ask anything…',
  className,
}: ChatbotProps) {
  const { messages, input, setInput, send, isStreaming, stop } = useChat({
    initialMessages,
    onSend,
  });

  const isEmpty = messages.length === 0;

  return (
    <Flex direction="column" style={{ height: '100%', minHeight: 0 }} className={cn(className)}>
      {/* ── Header (slim, optional) ── */}
      <Flex align="center" px="4" py="3" flexShrink="0">
        <Heading size="3">Chat</Heading>
      </Flex>
      <Separator size="4" />

      {/* ── Log region ── */}
      <Flex
        direction="column"
        flexGrow="1"
        position="relative"
        style={{ minHeight: 0, overflow: 'hidden' }}
      >
        <ChatContainer.Root className="flex-1 px-4 py-4" style={{ position: 'relative' }}>
          <ChatContainer.Content>
            {isEmpty ? (
              <EmptyState
                suggestions={suggestions}
                onSelect={(text) => {
                  // Prefill the composer with the suggestion text. The user can
                  // edit it or press Enter / the send button to submit.
                  setInput(text);
                }}
              />
            ) : (
              <MessageThread messages={messages} isStreaming={isStreaming} />
            )}
            <ChatContainer.ScrollAnchor />
          </ChatContainer.Content>
          {/* Scroll-to-bottom affordance — must be inside ChatContainer.Root for context */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              zIndex: 10,
            }}
          >
            <ScrollButton />
          </div>
        </ChatContainer.Root>
      </Flex>

      {/* ── Composer (sticky bottom) ── */}
      <Flex direction="column" gap="2" px="4" py="3" flexShrink="0">
        <PromptInput value={input} onValueChange={setInput} onSubmit={send} isLoading={isStreaming}>
          <PromptInput.Textarea placeholder={placeholder} />
          <PromptInput.Actions>
            <PromptInput.Action tooltip={isStreaming ? 'Stop generation' : 'Send message'}>
              <IconButton
                size="2"
                variant="solid"
                aria-label={isStreaming ? 'Stop generation' : 'Send message'}
                onClick={isStreaming ? stop : send}
              >
                {isStreaming ? <StopIcon /> : <PaperPlaneIcon />}
              </IconButton>
            </PromptInput.Action>
          </PromptInput.Actions>
        </PromptInput>
        {isStreaming ? (
          <Flex align="center" gap="2" px="1">
            <Loader variant="dots" size="1" />
            <Text size="1" color="gray">
              Generating…
            </Text>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}
