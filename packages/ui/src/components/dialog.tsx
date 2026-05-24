"use client";

import type { ComponentPropsWithRef } from "react";
import { Dialog as RadixDialog } from "radix-ui";

import { cn } from "../lib/cn";

// Radix Dialog wrapper. Re-export the structural parts as-is; wrap the parts
// that need styling. The file-level `"use client"` makes every export a client
// boundary (Radix manages open/focus/keyboard state internally).
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof RadixDialog.Content>) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-foreground/40" />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-md border border-border bg-surface p-6 text-surface-foreground shadow-lg focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
