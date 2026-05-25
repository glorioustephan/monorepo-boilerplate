import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Flex, Text } from '../components';

export interface FieldProps {
  /** Visible label text. */
  readonly label: string;
  /** id applied to the control; wires the label's `htmlFor` and `aria-describedby`. */
  readonly htmlFor: string;
  /** The form control (TextField.Root, Select.Root trigger, Checkbox, …). */
  readonly children: ReactNode;
  /** Helper text shown below the control. */
  readonly description?: string;
  /** Error text shown below the control (use instead of / alongside description). */
  readonly error?: string;
  /** Append a required marker to the label. */
  readonly required?: boolean;
}

interface ControlProps {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

/**
 * Field — a labelled form control with optional description and error text, wired for
 * accessibility: the label's `htmlFor`, and the control's `id` / `aria-describedby` /
 * `aria-invalid` (injected into the child). `children` must be a **single** React element
 * control; Field owns its `id` (set to `htmlFor`) and only adds ARIA attributes when relevant
 * (it won't clobber caller-set `aria-describedby`/`aria-invalid` when there's no description/error).
 */
export function Field({ label, htmlFor, children, description, error, required }: FieldProps) {
  const descriptionId = description ? `${htmlFor}-description` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  // Inject id + ARIA into the single control child. Conditional spreads avoid overwriting
  // caller-set attributes with `undefined` when no description/error applies.
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<ControlProps>, {
        id: htmlFor,
        ...(describedBy ? { 'aria-describedby': describedBy } : {}),
        ...(error ? { 'aria-invalid': true } : {}),
      })
    : children;

  return (
    <Flex direction="column" gap="1">
      <Text as="label" htmlFor={htmlFor} size="2" weight="medium">
        {label}
        {required ? ' *' : ''}
      </Text>
      {control}
      {description ? (
        <Text id={descriptionId} size="1" color="gray">
          {description}
        </Text>
      ) : undefined}
      {error ? (
        <Text id={errorId} size="1" color="red">
          {error}
        </Text>
      ) : undefined}
    </Flex>
  );
}
