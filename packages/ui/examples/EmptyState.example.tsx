import { ArchiveIcon } from '@radix-ui/react-icons';

import { Button, EmptyState } from '@monorepo-boilerplate/ui';

/** EmptyState shows a no-projects placeholder with an icon, heading, description, and action. */
export default function EmptyStateExample() {
  return (
    <EmptyState
      icon={<ArchiveIcon width={32} height={32} />}
      title="No projects yet"
      description="Get started by creating your first project. It only takes a minute."
      action={<Button>New project</Button>}
    />
  );
}
