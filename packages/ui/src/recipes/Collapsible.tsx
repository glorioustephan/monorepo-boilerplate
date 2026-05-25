'use client';

import { type ReactNode, useId, useState } from 'react';

import { cn } from '../lib/cn';

export interface CollapsibleProps {
  /**
   * Trigger content rendered inside an accessible toggle button. Pass *content* (text, an icon),
   * not an interactive element — Collapsible owns the `<button>`. May be a render function that
   * receives the current `open` state (e.g. to rotate a chevron).
   */
  readonly trigger: ReactNode | ((state: { readonly open: boolean }) => ReactNode);
  /** The collapsible content, revealed when open. */
  readonly children: ReactNode;
  /** Controlled open state. Provide together with `onOpenChange`. */
  readonly open?: boolean;
  /** Initial open state when uncontrolled. */
  readonly defaultOpen?: boolean;
  /** Notified whenever the open state changes (both controlled and uncontrolled). */
  readonly onOpenChange?: (open: boolean) => void;
  /** Extra class names merged onto the root. */
  readonly className?: string;
}

/**
 * Collapsible — a CSS-only show/hide region with an accessible toggle button.
 * Use for disclosure widgets the kit's Radix atoms don't cover: FAQ accordions, expandable
 * sidebar sections, and mobile nav menus. Animates height via a `grid-template-rows` transition
 * (no JS animation, respects reduced-motion). Controlled via `open`/`onOpenChange` or uncontrolled
 * via `defaultOpen`. Pass trigger *content* (not an interactive element) — it owns the button.
 */
export function Collapsible({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const contentId = useId();

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <div className={cn('mb-collapsible', className)} data-state={isOpen ? 'open' : 'closed'}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
        className="mb-collapsible-trigger"
      >
        {typeof trigger === 'function' ? trigger({ open: isOpen }) : trigger}
      </button>
      <div id={contentId} className="mb-collapsible-content">
        <div className="mb-collapsible-content-inner">{children}</div>
      </div>
    </div>
  );
}
