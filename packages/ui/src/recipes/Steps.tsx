'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Children, isValidElement, type ReactNode, useState } from 'react';

import { Flex, Separator, Text } from '../components';
import { cn } from '../lib/cn';
import { Collapsible } from './Collapsible';

// ---------- Prop interfaces ----------

export interface StepsProps {
  /** Compound children — `Steps.Trigger` + `Steps.Content`. */
  readonly children: ReactNode;
  /** Whether the steps list starts open. Defaults to `true`. */
  readonly defaultOpen?: boolean;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

export interface StepsTriggerProps {
  /** Trigger label content. */
  readonly children: ReactNode;
  /** Optional leading icon; swaps to a chevron on hover. */
  readonly leftIcon?: ReactNode;
  /** Extra class names merged onto the trigger wrapper. */
  readonly className?: string;
}

export interface StepsContentProps {
  /** Step items — typically `Steps.Item` elements. */
  readonly children: ReactNode;
  /** Override the default vertical bar; omit to use the built-in `Steps.Bar`. */
  readonly bar?: ReactNode;
  /** Extra class names merged onto the content wrapper. */
  readonly className?: string;
}

export interface StepsItemProps {
  /** Step text or content. */
  readonly children: ReactNode;
  /** Extra class names merged onto the item wrapper. */
  readonly className?: string;
}

export interface StepsBarProps {
  /** Extra class names merged onto the bar element. */
  readonly className?: string;
}

// ---------- Parts ----------

/**
 * StepsBar — the vertical separator bar rendered in the left column of Steps.Content.
 * Composed automatically by Steps.Content unless you pass a custom `bar` prop.
 */
export function StepsBar({ className }: StepsBarProps) {
  return <Separator orientation="vertical" size="4" aria-hidden="true" className={cn(className)} />;
}

/**
 * StepsItem — a single step rendered in the right column of Steps.Content.
 * Renders as muted gray small text.
 */
export function StepsItem({ children, className }: StepsItemProps) {
  return (
    <Text as="p" size="2" color="gray" className={cn(className)}>
      {children}
    </Text>
  );
}

/**
 * StepsTrigger — the clickable header of a Steps collapsible.
 * Renders a label with optional leading icon and a trailing chevron.
 * Note: receives `open` from Collapsible's render-function trigger pattern;
 * Steps.Root passes it down via the trigger prop.
 */
export interface StepsTriggerInternalProps extends StepsTriggerProps {
  readonly open?: boolean;
}

export function StepsTrigger({ children, leftIcon, className }: StepsTriggerProps) {
  // This component is used as a declarative child; the internal version below
  // receives `open` when rendered as a Collapsible trigger render-function.
  return (
    <Flex align="center" justify="start" gap="2" width="100%" className={cn(className)}>
      {leftIcon ? (
        <span className="relative inline-flex size-4 items-center justify-center">{leftIcon}</span>
      ) : null}
      <Text size="2" color="gray">
        {children}
      </Text>
      <ChevronDownIcon aria-hidden="true" style={{ marginLeft: 'auto' }} />
    </Flex>
  );
}

/**
 * StepsContent — the collapsible body of a Steps disclosure.
 * Renders a 2-column grid: a vertical bar on the left, stacked items on the right.
 */
export function StepsContent({ children, bar, className }: StepsContentProps) {
  return (
    <div className={cn('mb-steps-grid', className)}>
      <div className="self-stretch">{bar ?? <StepsBar />}</div>
      <Flex direction="column" gap="3">
        {children}
      </Flex>
    </div>
  );
}

// ---------- Root ----------

/**
 * Steps — collapsible step list built over the Collapsible recipe with a vertical bar layout.
 * Use for AI plan/reasoning steps shown inline in an assistant turn. Defaults to open.
 *
 * ```tsx
 * <Steps>
 *   <Steps.Trigger leftIcon={<GearIcon />}>Plan</Steps.Trigger>
 *   <Steps.Content>
 *     <Steps.Item>Search the web</Steps.Item>
 *     <Steps.Item>Summarise results</Steps.Item>
 *   </Steps.Content>
 * </Steps>
 * ```
 *
 * Keywords: steps, plan, reasoning, collapsible, AI, vertical bar, list.
 */
export function Steps({ children, defaultOpen = true, className }: StepsProps) {
  const childArray = Children.toArray(children);

  // Split compound children into trigger and content nodes.
  const triggerChild = childArray.find(
    (c) => isValidElement(c) && c.type === StepsTrigger,
  ) as ReactNode;
  const contentChild = childArray.find(
    (c) => isValidElement(c) && c.type === StepsContent,
  ) as ReactNode;

  // Build a render-function trigger that rotates the chevron based on open state.
  const triggerFn = triggerChild
    ? ({ open }: { readonly open: boolean }) => (
        <StepsTriggerWithOpen node={triggerChild} open={open} />
      )
    : undefined;

  return (
    <Collapsible trigger={triggerFn ?? null} defaultOpen={defaultOpen} className={cn(className)}>
      {contentChild}
    </Collapsible>
  );
}

/** Internal adapter that injects the `open` state into a StepsTrigger's chevron. */
function StepsTriggerWithOpen({
  node,
  open,
}: {
  readonly node: ReactNode;
  readonly open: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  if (!isValidElement(node)) return null;
  const props = node.props as StepsTriggerProps;
  const { children, leftIcon, className } = props;

  return (
    <Flex
      align="center"
      justify="start"
      gap="2"
      width="100%"
      className={cn(className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {leftIcon ? (
        <span className="relative inline-flex size-4 items-center justify-center">
          <span
            style={{
              opacity: hovered ? 0 : 1,
              transition: 'opacity 150ms',
              display: 'inline-flex',
            }}
          >
            {leftIcon}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            style={{
              position: 'absolute',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 150ms, transform 200ms',
              transform: open ? 'rotate(180deg)' : undefined,
            }}
          />
        </span>
      ) : null}
      <Text size="2" color="gray">
        {children}
      </Text>
      {!leftIcon ? (
        <ChevronDownIcon
          aria-hidden="true"
          style={{
            marginLeft: 'auto',
            transition: 'transform 200ms',
            transform: open ? 'rotate(180deg)' : undefined,
          }}
        />
      ) : null}
    </Flex>
  );
}

Steps.Trigger = StepsTrigger;
Steps.Content = StepsContent;
Steps.Item = StepsItem;
Steps.Bar = StepsBar;
