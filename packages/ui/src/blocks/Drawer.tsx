'use client';

import type { ComponentProps, ReactNode } from 'react';

import { Box, Dialog, Flex, IconButton, Text, VisuallyHidden } from '../components';
import { cn } from '../lib/cn';

/** Re-exported Dialog parts that drive the Drawer's open state and trigger. */
const Root = Dialog.Root;
const Trigger = Dialog.Trigger;
const Close = Dialog.Close;

/** Props for `Drawer.Content` — the sliding side panel. Extends Dialog.Content's props. */
export interface DrawerContentProps extends Omit<
  ComponentProps<typeof Dialog.Content>,
  'children' | 'title'
> {
  /** Which edge the drawer slides in from. Defaults to `'right'`. */
  readonly side?: 'left' | 'right';
  /** Heading shown in the drawer header (also the accessible dialog title). */
  readonly title?: ReactNode;
  /** Supporting text shown under the title. */
  readonly description?: ReactNode;
  /** Sticky footer slot — e.g. confirm/cancel actions. */
  readonly footer?: ReactNode;
  /** Drawer body content (scrolls when it overflows). */
  readonly children: ReactNode;
  /** Override the panel width (any CSS width). Defaults to `min(420px, 90vw)`. */
  readonly width?: string;
  readonly className?: string;
}

/** Stable default close glyph (avoids re-creating the element each render). */
const CLOSE_ICON = <Text aria-hidden="true">✕</Text>;

function Content({
  side = 'right',
  title,
  description,
  footer,
  children,
  width,
  className,
  ...rest
}: DrawerContentProps) {
  return (
    <Dialog.Content
      className={cn('mb-drawer-content', className)}
      data-side={side}
      style={width ? { width } : undefined}
      {...rest}
    >
      <Flex direction="column" height="100%">
        <Flex align="center" justify="between" gap="3" p="4">
          {title !== undefined ? (
            <Dialog.Title mb="0" size="4">
              {title}
            </Dialog.Title>
          ) : (
            <VisuallyHidden>
              <Dialog.Title>Drawer</Dialog.Title>
            </VisuallyHidden>
          )}
          <Dialog.Close>
            <IconButton variant="ghost" color="gray" aria-label="Close">
              {CLOSE_ICON}
            </IconButton>
          </Dialog.Close>
        </Flex>

        {description !== undefined ? (
          <Box px="4">
            <Dialog.Description size="2" color="gray" mb="0">
              {description}
            </Dialog.Description>
          </Box>
        ) : (
          <VisuallyHidden>
            <Dialog.Description>Drawer panel</Dialog.Description>
          </VisuallyHidden>
        )}

        <Box flexGrow="1" px="4" py="3" style={{ overflowY: 'auto' }}>
          {children}
        </Box>

        {footer !== undefined ? <Box p="4">{footer}</Box> : undefined}
      </Flex>
    </Dialog.Content>
  );
}

/**
 * Drawer — a panel that slides in from the side, built on the Dialog atom. Compose
 * `Drawer.Root` / `Drawer.Trigger` / `Drawer.Content` (with `side`, `title`, `description`,
 * `footer` slots) / `Drawer.Close`. Use for contextual edit forms, filters, details, and mobile
 * navigation. Keywords: drawer, sheet, side panel, slide-over, off-canvas, dialog.
 */
export const Drawer = {
  Root,
  Trigger,
  Content,
  Close,
} as const;
