'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Flex, Pagination, Text } from '@monorepo-boilerplate/ui';

/** Pagination shows a stateful 10-page navigator with arrow-icon prev/next labels. */
export default function PaginationExample() {
  const [page, setPage] = useState(1);

  return (
    <Flex direction="column" gap="4">
      <Pagination
        page={page}
        pageCount={10}
        onPageChange={setPage}
        prevLabel={
          <Flex align="center" gap="1">
            <ArrowLeftIcon />
            Previous
          </Flex>
        }
        nextLabel={
          <Flex align="center" gap="1">
            Next
            <ArrowRightIcon />
          </Flex>
        }
      />
      <Text size="2" color="gray" align="center">
        Page {page} of 10
      </Text>
    </Flex>
  );
}
