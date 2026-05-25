import type { ReactNode } from 'react';

import { Box, Container, Flex, Grid, Section } from '../components';
import { cn } from '../lib/cn';
import { PageHeading } from '../recipes/PageHeading';

/** SettingsTemplateProps — props for the SettingsTemplate. */
export interface SettingsTemplateProps {
  /**
   * Page title — passed to the internal `<PageHeading>` as `title`.
   * Omit to suppress the heading entirely.
   */
  readonly title?: ReactNode;
  /**
   * Supporting description rendered beneath the title.
   * Passed through to `<PageHeading description>`.
   */
  readonly description?: ReactNode;
  /**
   * Breadcrumb slot — e.g. a `<Breadcrumb>` component.
   * Passed through to `<PageHeading breadcrumbs>`.
   */
  readonly breadcrumbs?: ReactNode;
  /**
   * Section navigation slot — e.g. a `<VerticalNav>` listing settings categories.
   * When provided the layout switches to a two-column grid (nav | content).
   * The nav column is hidden below the `md` breakpoint.
   */
  readonly nav?: ReactNode;
  /**
   * Settings sections — compose `<FormLayout>` and `<ActionPanel>` blocks here.
   * Spans the full width when `nav` is absent; occupies 3 of 4 grid columns otherwise.
   */
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * SettingsTemplate — a settings page scaffold with a page heading, an optional
 * sidebar section nav, and a content area for form sections and action panels.
 * Use for account, profile, billing, and preferences pages.
 * Keywords: settings, preferences, account, profile, form page, two-column, nav sidebar.
 */
export function SettingsTemplate({
  title,
  description,
  breadcrumbs,
  nav,
  children,
  className,
}: SettingsTemplateProps) {
  const hasHeading = title !== undefined || description !== undefined || breadcrumbs !== undefined;

  return (
    <Container size="4" className={cn(className)}>
      <Section size="3">
        <Flex direction="column" gap="6">
          {hasHeading && (
            <PageHeading title={title} description={description} breadcrumbs={breadcrumbs} />
          )}

          {nav !== undefined ? (
            <Grid columns={{ initial: '1', md: '4' }} gap="6">
              {/* Section nav — hidden on mobile */}
              <Box display={{ initial: 'none', md: 'block' }}>{nav}</Box>

              {/* Settings content — spans 3 of 4 columns on md+ */}
              <Box gridColumn={{ md: 'span 3' }}>
                <Flex direction="column" gap="6">
                  {children}
                </Flex>
              </Box>
            </Grid>
          ) : (
            <Flex direction="column" gap="6">
              {children}
            </Flex>
          )}
        </Flex>
      </Section>
    </Container>
  );
}
