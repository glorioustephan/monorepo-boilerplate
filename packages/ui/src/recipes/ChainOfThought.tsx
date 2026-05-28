'use client';

import { ChevronDownIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Flex, Text } from '../components';
import { cn } from '../lib/cn';
import { Collapsible } from './Collapsible';

// ---------- Prop interfaces ----------

export interface ChainOfThoughtProps {
  /** The step children — `ChainOfThought.Step` elements. */
  readonly children: ReactNode;
  /** Extra class names merged onto the root wrapper. */
  readonly className?: string;
}

export interface ChainOfThoughtStepProps {
  /** Compound children — `ChainOfThought.Trigger` + `ChainOfThought.Content`. */
  readonly children: ReactNode;
  /** Injected by `ChainOfThought` root — marks the final step (hides the connector). */
  readonly isLast?: boolean;
  /** Whether this step starts open. */
  readonly defaultOpen?: boolean;
  /** Extra class names merged onto the step element. */
  readonly className?: string;
}

export interface ChainOfThoughtTriggerProps {
  /** Trigger label content. */
  readonly children: ReactNode;
  /** Optional leading icon; defaults to `DotFilledIcon`. Swaps to a chevron on hover. */
  readonly leftIcon?: ReactNode;
  /** Extra class names merged onto the trigger wrapper. */
  readonly className?: string;
}

export interface ChainOfThoughtContentProps {
  /** Content shown when the step is expanded. */
  readonly children: ReactNode;
  /** Extra class names merged onto the content wrapper. */
  readonly className?: string;
}

export interface ChainOfThoughtItemProps {
  /** Item content — muted gray small text. */
  readonly children: ReactNode;
  /** Extra class names merged onto the item wrapper. */
  readonly className?: string;
}

// ---------- Parts ----------

/**
 * ChainOfThoughtItem — a single item rendered inside ChainOfThought.Content.
 * Muted gray small text.
 */
export function ChainOfThoughtItem({ children, className }: ChainOfThoughtItemProps) {
  return (
    <Text as="p" size="2" color="gray" className={cn(className)}>
      {children}
    </Text>
  );
}

/**
 * ChainOfThoughtTrigger — the clickable header of a ChainOfThought.Step.
 * Shows a leading dot icon (or custom leftIcon) and a trailing chevron.
 */
export function ChainOfThoughtTrigger({
  children,
  leftIcon,
  className,
}: ChainOfThoughtTriggerProps) {
  // The render-function version below injects the open state for chevron rotation.
  // This export is a declarative marker that ChainOfThoughtStep detects.
  return (
    <Flex align="center" gap="2" className={cn(className)}>
      <span className="inline-flex size-4 items-center justify-center">
        {leftIcon ?? <DotFilledIcon aria-hidden="true" />}
      </span>
      <Text size="2">{children}</Text>
      <ChevronDownIcon aria-hidden="true" style={{ marginLeft: 'auto' }} />
    </Flex>
  );
}

/**
 * ChainOfThoughtContent — the collapsible body of a ChainOfThought.Step.
 */
export function ChainOfThoughtContent({ children, className }: ChainOfThoughtContentProps) {
  return (
    <div className={cn('pl-6 pt-2', className)}>
      <Flex direction="column" gap="2">
        {children}
      </Flex>
    </div>
  );
}

// ---------- Step ----------

/**
 * ChainOfThoughtStep — a single collapsible step in the chain.
 * Receives `isLast` from `ChainOfThought` root (do not set manually).
 * When not last, a vertical connector line appears below the step.
 */
export function ChainOfThoughtStep({
  children,
  isLast = false,
  defaultOpen = false,
  className,
}: ChainOfThoughtStepProps) {
  const childArray = Children.toArray(children);

  // Split compound children.
  const triggerChild = childArray.find(
    (c) => isValidElement(c) && c.type === ChainOfThoughtTrigger,
  );
  const contentChild = childArray.find(
    (c) => isValidElement(c) && c.type === ChainOfThoughtContent,
  ) as ReactNode;

  // Build a render-function trigger that reads open state for chevron rotation.
  const triggerFn = triggerChild
    ? ({ open }: { readonly open: boolean }) => (
        <ChainOfThoughtTriggerWithOpen
          node={triggerChild as ReactElement<ChainOfThoughtTriggerProps>}
          open={open}
        />
      )
    : undefined;

  return (
    <div className={cn('mb-cot-step', className)} data-last={isLast ? 'true' : 'false'}>
      <Collapsible trigger={triggerFn ?? null} defaultOpen={defaultOpen}>
        {contentChild}
      </Collapsible>
    </div>
  );
}

/** Internal adapter: clones trigger props with the live `open` flag. */
function ChainOfThoughtTriggerWithOpen({
  node,
  open,
}: {
  readonly node: ReactElement<ChainOfThoughtTriggerProps>;
  readonly open: boolean;
}) {
  const { children, leftIcon, className } = node.props;

  return (
    <Flex align="center" gap="2" className={cn(className)}>
      <span className="inline-flex size-4 items-center justify-center">
        {leftIcon ?? <DotFilledIcon aria-hidden="true" />}
      </span>
      <Text size="2">{children}</Text>
      <ChevronDownIcon
        aria-hidden="true"
        style={{
          marginLeft: 'auto',
          transition: 'transform 200ms',
          transform: open ? 'rotate(180deg)' : undefined,
        }}
      />
    </Flex>
  );
}

// ---------- Root ----------

/**
 * ChainOfThought — a vertical chain of collapsible reasoning steps.
 * Clones each `ChainOfThought.Step` child to stamp the `isLast` prop so the last
 * step's vertical connector is hidden. Use inside assistant messages to surface
 * multi-step reasoning. Keywords: chain of thought, reasoning, steps, collapsible, AI.
 *
 * ```tsx
 * <ChainOfThought>
 *   <ChainOfThought.Step defaultOpen>
 *     <ChainOfThought.Trigger>Search the web</ChainOfThought.Trigger>
 *     <ChainOfThought.Content>
 *       <ChainOfThought.Item>Found 12 results…</ChainOfThought.Item>
 *     </ChainOfThought.Content>
 *   </ChainOfThought.Step>
 * </ChainOfThought>
 * ```
 */
export function ChainOfThought({ children, className }: ChainOfThoughtProps) {
  const childArray = Children.toArray(children);

  return (
    <div className={cn('mb-cot', className)}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<ChainOfThoughtStepProps>, {
          isLast: index === childArray.length - 1,
        });
      })}
    </div>
  );
}

ChainOfThought.Step = ChainOfThoughtStep;
ChainOfThought.Trigger = ChainOfThoughtTrigger;
ChainOfThought.Content = ChainOfThoughtContent;
ChainOfThought.Item = ChainOfThoughtItem;
