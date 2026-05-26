import { Badge, Button, Link, PageHeading, Text } from '@monorepo-boilerplate/ui';

/** PageHeading with breadcrumbs, inline meta badges, and primary actions. */
export default function PageHeadingExample() {
  return (
    <PageHeading
      breadcrumbs={
        <Text size="2" color="gray">
          <Link href="#">Dashboard</Link>
          {' / '}
          <Link href="#">Projects</Link>
          {' / '}
          Acme Corp
        </Text>
      }
      title="Acme Corp"
      meta={
        <>
          <Badge color="green" highContrast>
            Active
          </Badge>
          <Badge variant="outline">Enterprise</Badge>
        </>
      }
      description="Manage project settings, members, and integrations for the Acme Corp workspace."
      actions={
        <>
          <Button variant="soft">Share</Button>
          <Button>New task</Button>
        </>
      }
    />
  );
}
