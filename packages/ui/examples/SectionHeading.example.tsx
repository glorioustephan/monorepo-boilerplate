import { Button, SectionHeading } from '@monorepo-boilerplate/ui';

/** SectionHeading introducing a data section with an action button. */
export default function SectionHeadingExample() {
  return (
    <SectionHeading
      title="Team members"
      description="Manage who has access to this project and their roles."
      actions={<Button variant="soft">Invite member</Button>}
    />
  );
}
