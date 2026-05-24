"use client";

import { type ReactNode, useState } from "react";

import { Button } from "../components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";

export interface ConfirmDialogProps {
  /** The control that opens the dialog (e.g. a `<Button>`); rendered via `asChild`. */
  readonly trigger: ReactNode;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  /** Render the confirm action as destructive (e.g. delete). */
  readonly destructive?: boolean;
  /** Invoked when the user confirms; the dialog closes once it resolves. */
  readonly onConfirm: () => void | Promise<void>;
}

/**
 * Recipe: a Dialog wired to a confirm/cancel decision. Owns its open state so the
 * client boundary stays inside this leaf — server parents pass slot props only.
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  // Guards against double-submit and keeps the dialog open if `onConfirm` rejects
  // (the caller surfaces the error; we only close on success).
  async function handleConfirm() {
    setPending(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {description ? <DialogDescription>{description}</DialogDescription> : null}
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant={destructive ? "destructive" : "primary"}
            disabled={pending}
            onClick={() => void handleConfirm()}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
