import type { ReactNode } from 'react';

import { Flex, Grid, Heading, Text } from '../components';
import { cn } from '../lib/cn';

export interface FormLayoutProps {
  /** Section heading rendered above the fields. */
  readonly title?: ReactNode;
  /** Supporting text rendered below the heading. */
  readonly description?: ReactNode;
  /** Form controls — compose `Field` + input atoms here. */
  readonly children: ReactNode;
  /** Footer action slot — e.g. Save / Cancel `Button`s. */
  readonly footer?: ReactNode;
  /** Number of field columns. Defaults to 1; sm breakpoint activates 2-col on wide viewports. */
  readonly columns?: 1 | 2;
  readonly className?: string;
}

/**
 * FormLayout — a titled form section with a responsive field grid and a footer action bar.
 * Use for profile/settings/onboarding forms; compose the kit's `Field` recipe inside `children`.
 * Keywords: form, section, layout, two-column, settings, profile.
 */
export function FormLayout({
  title,
  description,
  children,
  footer,
  columns = 1,
  className,
}: FormLayoutProps) {
  return (
    <Flex direction="column" gap="4" className={cn(className)}>
      {(title !== undefined || description !== undefined) && (
        <Flex direction="column" gap="1">
          {title !== undefined && (
            <Heading as="h2" size="4">
              {title}
            </Heading>
          )}
          {description !== undefined && (
            <Text size="2" color="gray">
              {description}
            </Text>
          )}
        </Flex>
      )}

      <Grid columns={{ initial: '1', sm: columns === 2 ? '2' : '1' }} gap="4">
        {children}
      </Grid>

      {footer !== undefined && (
        <Flex justify="end" gap="3" mt="2">
          {footer}
        </Flex>
      )}
    </Flex>
  );
}
