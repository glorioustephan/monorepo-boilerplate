'use client';

import { CheckCircledIcon, CrossCircledIcon, GearIcon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';

import { Badge, Card, Code, Flex, Separator, Spinner, Text } from '../components';
import { cn } from '../lib/cn';
import { Alert } from './Alert';
import { CodeBlock, CodeBlockCode } from './CodeBlock';
import { Collapsible } from './Collapsible';

// ---------- Types (verbatim prompt-kit parity) ----------

/** Lifecycle state of the tool call; drives the status badge and icon. */
export type ToolState = 'input-streaming' | 'input-available' | 'output-available' | 'output-error';

/** A tool/function call part with prompt-kit-compatible shape for drop-in parity. */
export interface ToolPart {
  /** Tool name / type identifier, e.g. `'search_web'`. */
  readonly type: string;
  /** Current lifecycle state. */
  readonly state: ToolState;
  /** Input arguments passed to the tool. */
  readonly input?: Record<string, unknown>;
  /** Tool result payload. */
  readonly output?: Record<string, unknown>;
  /** Provider-assigned call id. */
  readonly toolCallId?: string;
  /** Error detail shown when `state === 'output-error'`. */
  readonly errorText?: string;
}

export interface ToolProps {
  /** The tool call data part to render. */
  readonly toolPart: ToolPart;
  /** Whether the collapsible starts open. Defaults to `false`. */
  readonly defaultOpen?: boolean;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

// ---------- State → icon / badge helpers ----------

function StateIcon({ state }: { readonly state: ToolState }): ReactNode {
  switch (state) {
    case 'input-streaming':
      return <Spinner size="1" />;
    case 'input-available':
      return <GearIcon aria-hidden="true" />;
    case 'output-available':
      return <CheckCircledIcon aria-hidden="true" />;
    case 'output-error':
      return <CrossCircledIcon aria-hidden="true" />;
  }
}

type BadgeColor = 'blue' | 'amber' | 'green' | 'red';

const STATE_BADGE: Record<ToolState, { color: BadgeColor; label: string }> = {
  'input-streaming': { color: 'blue', label: 'Processing' },
  'input-available': { color: 'amber', label: 'Ready' },
  'output-available': { color: 'green', label: 'Completed' },
  'output-error': { color: 'red', label: 'Error' },
};

// ---------- Component ----------

/**
 * Tool — inline tool/function-call card with a collapsible input/output panel.
 * Use inside assistant message turns to surface tool invocations. Accepts the
 * prompt-kit `ToolPart` shape for drop-in parity. Status is conveyed by Badge text
 * (not color alone). Keywords: tool, function call, AI, collapsible, badge, code block.
 */
export function Tool({ toolPart, defaultOpen = false, className }: ToolProps) {
  const { type, state, input, output, toolCallId, errorText } = toolPart;
  const { color, label } = STATE_BADGE[state];

  const trigger = (
    <Flex align="center" gap="2" py="1">
      <StateIcon state={state} />
      <Code size="2">{type}</Code>
      <Badge color={color} variant="soft" size="1">
        {label}
      </Badge>
    </Flex>
  );

  return (
    <Card variant="surface" className={cn(className)}>
      <Collapsible trigger={trigger} defaultOpen={defaultOpen}>
        <Flex direction="column" gap="3" pt="2">
          {/* Input section */}
          {input && Object.keys(input).length > 0 ? (
            <Flex direction="column" gap="1">
              <Text size="1" color="gray" weight="medium">
                Input
              </Text>
              <Separator size="4" />
              <Flex direction="column" gap="1" pt="1">
                {Object.entries(input).map(([key, value]) => (
                  <Flex key={key} gap="2" align="start">
                    <Code size="1" color="gray">
                      {key}
                    </Code>
                    <Text size="1" color="gray">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          ) : null}

          {/* Output section */}
          {state === 'output-available' && output ? (
            <Flex direction="column" gap="1">
              <Text size="1" color="gray" weight="medium">
                Output
              </Text>
              <Separator size="4" />
              <CodeBlock>
                <CodeBlockCode code={JSON.stringify(output, null, 2)} language="json" />
              </CodeBlock>
            </Flex>
          ) : null}

          {/* Error section */}
          {state === 'output-error' && errorText ? <Alert color="red">{errorText}</Alert> : null}

          {/* toolCallId */}
          {toolCallId ? (
            <Text size="1" color="gray">
              Call ID:{' '}
              <Code size="1" color="gray">
                {toolCallId}
              </Code>
            </Text>
          ) : null}
        </Flex>
      </Collapsible>
    </Card>
  );
}
