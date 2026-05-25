"use client";

// ConfirmDialog itself uses no hooks, but its `onConfirm` function prop can't cross the RSC
// serialization boundary, so it's only usable from Client Components — the directive makes
// that boundary explicit.
import type { ReactNode } from "react";

import { AlertDialog, Button, type ButtonProps, Flex } from "../components";

export interface ConfirmDialogProps {
  /** Element that opens the dialog (e.g. a `<Button>`). */
  readonly trigger: ReactNode;
  readonly title: string;
  readonly description?: ReactNode;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  /** Called when the user confirms. */
  readonly onConfirm?: () => void;
  /** Accent color of the confirm button (default "red" for destructive intent). */
  readonly confirmColor?: ButtonProps["color"];
}

/**
 * ConfirmDialog — an ergonomic confirm/cancel wrapper around Radix `AlertDialog`. Pass a
 * `trigger` element and a confirm handler; the dialog handles focus trapping and dismissal.
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  confirmColor = "red",
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        {description ? (
          <AlertDialog.Description size="2">{description}</AlertDialog.Description>
        ) : undefined}
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {cancelLabel}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color={confirmColor} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
