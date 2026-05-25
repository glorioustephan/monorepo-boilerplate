import { Avatar, Card, CardHeading, IconButton } from '@monorepo-boilerplate/ui';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

/** CardHeading inside a Card with an Avatar and an icon-button actions slot. */
export default function CardHeadingExample() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeading
        avatar={<Avatar src="https://i.pravatar.cc/40?img=12" fallback="AL" radius="full" />}
        title="Ada Lovelace"
        description="Engineering · Lead"
        actions={
          <IconButton variant="ghost" color="gray" aria-label="More options">
            <DotsHorizontalIcon />
          </IconButton>
        }
      />
    </Card>
  );
}
