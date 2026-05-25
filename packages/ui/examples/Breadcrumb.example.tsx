import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Breadcrumb, Text } from '@monorepo-boilerplate/ui';

/** Breadcrumb shows a three-level trail with a chevron separator. */
export default function BreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Project Nero' },
      ]}
      separator={
        <Text color="gray" aria-hidden>
          <ChevronRightIcon />
        </Text>
      }
    />
  );
}
