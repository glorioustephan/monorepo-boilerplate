import type { ReactNode } from 'react';

import { Container, Flex, Section } from '../components';
import { cn } from '../lib/cn';
import { PageHeading } from '../recipes';

export interface ListPageTemplateProps {
  /** Page title. */
  readonly title: ReactNode;
  /** Supporting description under the title. */
  readonly description?: ReactNode;
  /** Breadcrumb slot — e.g. a `<Breadcrumb>`. */
  readonly breadcrumbs?: ReactNode;
  /** Header action slot — e.g. a "New item" `<Button>`. */
  readonly actions?: ReactNode;
  /** Toolbar slot rendered above the list — filters, search, tabs. */
  readonly toolbar?: ReactNode;
  /** The list body — a `<DataTable>`, `<StackedList>`, or an `<EmptyState>`. */
  readonly children: ReactNode;
  /** Pagination slot rendered below the list — e.g. a `<Pagination>`. */
  readonly pagination?: ReactNode;
  readonly className?: string;
}

/**
 * ListPageTemplate — a CRUD list page scaffold: page heading, optional toolbar, a list/table
 * body, and a pagination footer. Use as the standard shape for index pages; pass an `<EmptyState>`
 * as `children` when there's no data. Keywords: list page, index, table page, CRUD, pagination.
 */
export function ListPageTemplate({
  title,
  description,
  breadcrumbs,
  actions,
  toolbar,
  children,
  pagination,
  className,
}: ListPageTemplateProps) {
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
          {toolbar}
          {children}
          {pagination ? (
            <Flex justify="center" mt="2">
              {pagination}
            </Flex>
          ) : undefined}
        </Flex>
      </Section>
    </Container>
  );
}
