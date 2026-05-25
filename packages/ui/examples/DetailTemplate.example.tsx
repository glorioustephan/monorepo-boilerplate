import {
  Breadcrumb,
  Button,
  Card,
  DescriptionList,
  DetailTemplate,
  Feed,
  Flex,
  Heading,
} from '@monorepo-boilerplate/ui';

/** DetailTemplate lays out a record's details with a primary column and a related aside. */
export default function DetailTemplateExample() {
  return (
    <DetailTemplate
      title="Ada Lovelace"
      description="Engineering · Joined 2021"
      breadcrumbs={
        <Breadcrumb items={[{ label: 'People', href: '#' }, { label: 'Ada Lovelace' }]} />
      }
      actions={
        <Flex gap="3">
          <Button variant="soft" color="gray">
            Edit
          </Button>
          <Button variant="soft" color="red">
            Delete
          </Button>
        </Flex>
      }
      aside={
        <Card>
          <Heading as="h3" size="3" mb="3">
            Recent activity
          </Heading>
          <Feed
            items={[
              { id: '1', content: 'Updated profile', timestamp: '2h ago' },
              { id: '2', content: 'Joined the Platform team', timestamp: '3d ago' },
            ]}
          />
        </Card>
      }
    >
      <Card>
        <DescriptionList
          items={[
            { term: 'Full name', value: 'Ada Lovelace' },
            { term: 'Email', value: 'ada@example.com' },
            { term: 'Title', value: 'Principal Engineer' },
            { term: 'Team', value: 'Platform' },
          ]}
        />
      </Card>
    </DetailTemplate>
  );
}
