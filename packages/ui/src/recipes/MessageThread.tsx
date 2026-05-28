'use client';

import { type ReactNode } from 'react';

import { Flex } from '../components';
import type { ChatMessage } from '../types';
import { cn } from '../lib/cn';
import { Loader } from './Loader';
import { Message } from './Message';
import { SystemMessage } from './SystemMessage';

// ---------------------------------------------------------------------------
// Prop interface
// ---------------------------------------------------------------------------

/** Props for the MessageThread recipe. */
export interface MessageThreadProps {
  /** Ordered list of chat turns to render. */
  readonly messages: readonly ChatMessage[];
  /**
   * When true, appends a `Loader variant="dots"` after the last assistant turn
   * to indicate a streaming response is in progress.
   */
  readonly isStreaming?: boolean;
  /**
   * Escape hatch — override how a single turn is rendered.
   * Return `undefined` to fall back to the default renderer.
   */
  readonly renderMessage?: (message: ChatMessage) => ReactNode;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// Default per-turn renderers
// ---------------------------------------------------------------------------

function UserTurn({ message }: { readonly message: ChatMessage }) {
  return (
    <Flex justify="end" className="w-full">
      <Message.Content data-role="user" className="mb-message-content max-w-[75%]">
        {message.content}
      </Message.Content>
    </Flex>
  );
}

function AssistantTurn({
  message,
  isLastStreaming,
}: {
  readonly message: ChatMessage;
  readonly isLastStreaming: boolean;
}) {
  return (
    <Flex gap="3" align="start" className="w-full">
      <Message.Avatar src="" alt="Assistant" fallback="AI" size="2" />
      <Flex direction="column" gap="2" style={{ minWidth: 0, flex: 1 }}>
        <Message.Content markdown className="mb-message-content">
          {message.content}
        </Message.Content>
        {isLastStreaming ? <Loader variant="dots" size="1" /> : null}
      </Flex>
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// MessageThread
// ---------------------------------------------------------------------------

/**
 * MessageThread — renders an ordered list of `ChatMessage` turns.
 * User turns are right-aligned in an accent-tinted bubble; assistant turns are
 * left-aligned with an avatar and full markdown rendering (headings, code blocks,
 * tables). System turns surface via `SystemMessage`. Pass `isStreaming` to show
 * a `Loader` after the trailing assistant turn. Provide `renderMessage` to override
 * individual turns.
 * Use as the log body inside a `ChatContainer` (Chatbot / ToolCalling templates).
 * Keywords: message thread, chat, messages, user, assistant, system, markdown, log.
 */
export function MessageThread({
  messages,
  isStreaming = false,
  renderMessage,
  className,
}: MessageThreadProps) {
  const lastAssistantIndex = messages.reduce<number>(
    (acc, m, i) => (m.role === 'assistant' ? i : acc),
    -1,
  );

  return (
    <Flex direction="column" gap="4" className={cn('w-full', className)}>
      {messages.map((message, index) => {
        // Allow escape hatch to override.
        if (renderMessage) {
          const override = renderMessage(message);
          if (override !== undefined) {
            return <div key={message.id}>{override}</div>;
          }
        }

        if (message.role === 'user') {
          return <UserTurn key={message.id} message={message} />;
        }

        if (message.role === 'assistant') {
          const isLastStreaming = isStreaming && index === lastAssistantIndex;
          return (
            <AssistantTurn key={message.id} message={message} isLastStreaming={isLastStreaming} />
          );
        }

        // system role
        return (
          <SystemMessage key={message.id} variant="action">
            {message.content}
          </SystemMessage>
        );
      })}
    </Flex>
  );
}
