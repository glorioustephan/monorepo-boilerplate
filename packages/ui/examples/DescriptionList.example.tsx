import { Card, DescriptionList } from '@monorepo-boilerplate/ui';

/** DescriptionList renders key/value metadata, here showing a user profile inside a Card. */
export default function DescriptionListExample() {
  return (
    <Card size="3" style={{ maxWidth: '480px' }}>
      <DescriptionList
        items={[
          { term: 'Full name', value: 'Alex Johnson' },
          { term: 'Email', value: 'alex.johnson@example.com' },
          { term: 'Title', value: 'Senior Product Designer' },
          { term: 'Role', value: 'Admin' },
        ]}
      />
    </Card>
  );
}
