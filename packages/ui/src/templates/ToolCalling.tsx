'use client';

import { type ReactNode } from 'react';
import { PaperPlaneIcon, StopIcon } from '@radix-ui/react-icons';

import { Flex, Heading, IconButton, Separator } from '../components';
import { ChatContainer } from '../blocks/ChatContainer';
import { cn } from '../lib/cn';
import { Message } from '../recipes/Message';
import { MessageThread } from '../recipes/MessageThread';
import { PromptInput } from '../recipes/PromptInput';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '../recipes/Reasoning';
import { ScrollButton } from '../recipes/ScrollButton';
import { Steps } from '../recipes/Steps';
import { ThinkingBar } from '../recipes/ThinkingBar';
import { Tool, type ToolPart } from '../recipes/Tool';
import { useChat } from '../recipes/useChat';
import type { ChatMessage } from '../types';
import type { ChatbotProps } from './Chatbot';

// ---------------------------------------------------------------------------
// Extended message type for ToolCalling
// ---------------------------------------------------------------------------

/** An assistant turn that may carry reasoning, step, and tool-call parts. */
export interface ToolCallingMessage extends ChatMessage {
  /** Collapsible reasoning / chain-of-thought prose rendered before the answer. */
  readonly reasoning?: string;
  /** Plan steps rendered in a `Steps` collapsible before the answer. */
  readonly steps?: readonly string[];
  /** Tool invocations rendered as collapsible `Tool` cards before the answer. */
  readonly tools?: readonly ToolPart[];
}

/** Props for the ToolCalling template. */
export interface ToolCallingProps extends Omit<ChatbotProps, 'initialMessages'> {
  /** Pre-seed the conversation with rich assistant turns (reasoning / steps / tools). */
  readonly initialMessages?: readonly ToolCallingMessage[];
}

// ---------------------------------------------------------------------------
// Per-turn renderer
// ---------------------------------------------------------------------------

function ToolCallingAssistantTurn({
  message,
  isLastStreaming,
}: {
  readonly message: ToolCallingMessage;
  readonly isLastStreaming: boolean;
}) {
  const { reasoning, steps, tools, content } = message;

  return (
    <Flex gap="3" align="start" className="w-full">
      <Message.Avatar src="" alt="Assistant" fallback="AI" size="2" />
      <Flex direction="column" gap="3" style={{ minWidth: 0, flex: 1 }}>
        {/* 1. Reasoning */}
        {reasoning ? (
          <Reasoning isStreaming={isLastStreaming}>
            <ReasoningTrigger>Thinking…</ReasoningTrigger>
            <ReasoningContent>{reasoning}</ReasoningContent>
          </Reasoning>
        ) : null}

        {/* 2. Steps */}
        {steps && steps.length > 0 ? (
          <Steps defaultOpen>
            <Steps.Trigger>Plan</Steps.Trigger>
            <Steps.Content>
              {steps.map((step, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: steps are positionally stable
                <Steps.Item key={i}>{step}</Steps.Item>
              ))}
            </Steps.Content>
          </Steps>
        ) : null}

        {/* 3. Tool blocks */}
        {tools && tools.length > 0 ? (
          <Flex direction="column" gap="2">
            {tools.map((toolPart, i) => (
              <Tool
                // biome-ignore lint/suspicious/noArrayIndexKey: tool list is stable per turn
                key={toolPart.toolCallId ?? i}
                toolPart={toolPart}
                defaultOpen={false}
              />
            ))}
          </Flex>
        ) : null}

        {/* 4. Markdown answer */}
        {content ? (
          <Message.Content markdown className="mb-message-content">
            {content}
          </Message.Content>
        ) : null}
      </Flex>
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// Custom renderMessage — delegates to ToolCallingAssistantTurn for assistant turns
// ---------------------------------------------------------------------------

function makeRenderMessage(
  messages: readonly ToolCallingMessage[],
  isStreaming: boolean,
): (message: ChatMessage) => ReactNode {
  const lastAssistantIndex = messages.reduce<number>(
    (acc, m, i) => (m.role === 'assistant' ? i : acc),
    -1,
  );

  return (message: ChatMessage) => {
    const index = messages.findIndex((m) => m.id === message.id);
    const rich = messages[index] as ToolCallingMessage | undefined;

    if (message.role !== 'assistant' || !rich) {
      // Let MessageThread handle user / system turns with its default renderer.
      return undefined;
    }

    const isLastStreaming = isStreaming && index === lastAssistantIndex;
    return <ToolCallingAssistantTurn message={rich} isLastStreaming={isLastStreaming} />;
  };
}

// ---------------------------------------------------------------------------
// ToolCalling template
// ---------------------------------------------------------------------------

/**
 * ToolCalling — AI chat template that renders rich assistant turns with inline
 * `Reasoning`, `Steps`, and `Tool` blocks before the markdown answer.
 * Extends the `Chatbot` shell; the only difference is per-turn rendering.
 * Pass `ToolCallingMessage` objects as `initialMessages` to pre-seed rich turns.
 * Keywords: tool calling, function call, reasoning, steps, AI, chat, template, streaming.
 */
export function ToolCalling({
  initialMessages,
  onSend,
  placeholder = 'Ask anything…',
  className,
}: ToolCallingProps) {
  const typedMessages = (initialMessages ?? []) as readonly ToolCallingMessage[];

  const { messages, input, setInput, send, isStreaming, stop } = useChat({
    initialMessages: typedMessages,
    onSend,
  });

  // Cast the live messages array so we can look up rich parts by id.
  // New turns sent interactively won't carry tool/reasoning parts unless
  // onSend populates them — which is outside the scope of this hook.
  const richMessages = messages as readonly ToolCallingMessage[];

  const renderMessage = makeRenderMessage(richMessages, isStreaming);

  return (
    <Flex direction="column" style={{ height: '100%', minHeight: 0 }} className={cn(className)}>
      {/* ── Header ── */}
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
            <MessageThread
              messages={messages}
              isStreaming={isStreaming}
              renderMessage={renderMessage}
            />
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

      {/* ── ThinkingBar (above composer while streaming) ── */}
      {isStreaming ? (
        <Flex px="4" pt="2" flexShrink="0">
          <ThinkingBar onStop={stop} />
        </Flex>
      ) : null}

      {/* ── Composer ── */}
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
      </Flex>
    </Flex>
  );
}
