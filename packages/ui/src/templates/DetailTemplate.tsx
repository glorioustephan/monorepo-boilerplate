import type { ReactNode } from 'react';

import { Box, Container, Flex, Grid, Section } from '../components';
import { cn } from '../lib/cn';
import { PageHeading } from '../recipes';

export interface DetailTemplateProps {
  /** Record title (person, order, project, …). */
  readonly title: ReactNode;
  /** Supporting description under the title. */
  readonly description?: ReactNode;
  /** Breadcrumb slot. */
  readonly breadcrumbs?: ReactNode;
  /** Header action slot — e.g. Edit / Delete `<Button>`s. */
  readonly actions?: ReactNode;
  /** Primary detail content — e.g. a `<DescriptionList>`, cards, or a `<DataTable>`. */
  readonly children: ReactNode;
  /** Optional secondary column (related panels, activity feed). Hidden into a single column on mobile. */
  readonly aside?: ReactNode;
  readonly className?: string;
}

/**
 * DetailTemplate — a record-detail page scaffold: page heading plus a main content column and an
 * optional secondary `aside` column (two-up on md+). Use for profile, order, and entity detail
 * pages. Keywords: detail page, record, profile, show page, two column.
 */
export function DetailTemplate({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  aside,
  className,
}: DetailTemplateProps) {
  return (
    <Container size="4" className={cn(className)}>
      <Section size="3">
        <Flex direction="column" gap="5">
          <PageHeading
            title={title}
            description={description}
            breadcrumbs={breadcrumbs}
            actions={actions}
          />
          {aside !== undefined ? (
            <Grid columns={{ initial: '1', md: '3' }} gap="5">
              <Box gridColumn={{ md: 'span 2' }}>{children}</Box>
              <Box>{aside}</Box>
            </Grid>
          ) : (
            children
          )}
        </Flex>
      </Section>
    </Container>
  );
}
