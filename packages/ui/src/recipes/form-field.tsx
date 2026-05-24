import type { ComponentPropsWithRef, ReactNode } from "react";

import { Input } from "../components/input";

export interface FormFieldProps extends Omit<ComponentPropsWithRef<"input">, "id"> {
  /** Ties the label, input, and messages together; pass an explicit, stable id. */
  readonly id: string;
  readonly label: ReactNode;
  /** Helper text rendered below the input and wired via `aria-describedby`. */
  readonly description?: ReactNode;
  /** Error text; sets `aria-invalid` and styles the message as destructive. */
  readonly error?: ReactNode;
}

/**
 * Recipe: a labelled Input with optional description and error, accessibly wired.
 * Server-safe — it takes an explicit `id` instead of `useId`, so it stays usable
 * in Server Components; add a `"use client"` parent only if you control the value.
 */
export function FormField({ id, label, description, error, ...inputProps }: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...inputProps}
      />
      {description ? (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
