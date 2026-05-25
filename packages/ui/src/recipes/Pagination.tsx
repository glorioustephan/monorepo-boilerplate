'use client';

import type { ReactNode } from 'react';

import { Button, Flex, IconButton, Text } from '../components';
import { cn } from '../lib/cn';

/** Pagination props — page-navigation control with prev/next and numbered page buttons. */
export interface PaginationProps {
  /** Current 1-based page number. */
  readonly page: number;
  /** Total number of pages. */
  readonly pageCount: number;
  /** Called with the target page number when any button is clicked. */
  readonly onPageChange: (page: number) => void;
  /** Label for the Previous button. Defaults to "Previous". */
  readonly prevLabel?: ReactNode;
  /** Label for the Next button. Defaults to "Next". */
  readonly nextLabel?: ReactNode;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/** A page token: a 1-based page number, or a uniquely-keyed gap marker rendered as "…". */
type PageToken = number | 'gap-start' | 'gap-end';

/** Build the list of page tokens (numbers or gap markers) to show for the given page/pageCount. */
function buildPageTokens(page: number, pageCount: number): PageToken[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const tokens: PageToken[] = [1];
  const rangeStart = Math.max(2, page - 1);
  const rangeEnd = Math.min(pageCount - 1, page + 1);

  if (rangeStart > 2) tokens.push('gap-start');
  for (let i = rangeStart; i <= rangeEnd; i++) tokens.push(i);
  if (rangeEnd < pageCount - 1) tokens.push('gap-end');
  tokens.push(pageCount);

  return tokens;
}

/**
 * Pagination — centered page-number navigation for paginated data sets.
 * Use for tables, search results, and lists with more items than fit on one screen.
 * Keywords: pagination, pager, page numbers, prev, next, navigate, pages.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  className,
}: PaginationProps) {
  const tokens = buildPageTokens(page, pageCount);

  return (
    <Flex justify="between" align="center" gap="2" className={cn(className)}>
      <Button variant="soft" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        {prevLabel}
      </Button>

      <Flex align="center" gap="1">
        {tokens.map((token) => {
          if (token === 'gap-start' || token === 'gap-end') {
            return (
              <Flex key={token} align="center" justify="center" width="32px">
                <Text size="2" color="gray">
                  …
                </Text>
              </Flex>
            );
          }
          const isCurrent = token === page;
          return (
            <IconButton
              key={token}
              variant={isCurrent ? 'solid' : 'soft'}
              color={isCurrent ? undefined : 'gray'}
              aria-label={`Page ${token}`}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => onPageChange(token)}
            >
              {token}
            </IconButton>
          );
        })}
      </Flex>

      <Button variant="soft" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        {nextLabel}
      </Button>
    </Flex>
  );
}
