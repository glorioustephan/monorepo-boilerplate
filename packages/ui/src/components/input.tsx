import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export type InputProps = ComponentPropsWithRef<"input">;

// Always render with an associated label (`<label htmlFor>` or `aria-label`) —
// a placeholder is not an accessible name.
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
