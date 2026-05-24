"use client";

import type { ComponentPropsWithRef } from "react";
import { Tooltip as RadixTooltip } from "radix-ui";

import { cn } from "../lib/cn";

// Wrap the app (or a subtree) in <TooltipProvider> once, then use Tooltip per control.
export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithRef<typeof RadixTooltip.Content>) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 rounded-sm border border-border bg-surface px-2 py-1 text-xs text-surface-foreground shadow-md",
          className,
        )}
        {...props}
      />
    </RadixTooltip.Portal>
  );
}
