import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export type CardProps = ComponentPropsWithRef<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface p-6 text-surface-foreground",
        className,
      )}
      {...props}
    />
  );
}
