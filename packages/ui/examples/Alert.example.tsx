import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons';

import { Button, Alert } from '@monorepo-boilerplate/ui';

/** Alert demonstrates a success banner with a title, body, action buttons, and a dismiss control. */
export default function AlertExample() {
  return (
    <Alert
      color="green"
      title="Changes saved"
      icon={<CheckCircledIcon />}
      dismissIcon={<Cross2Icon />}
      onDismiss={() => undefined}
      actions={
        <>
          <Button size="1" variant="soft" color="green">
            View changes
          </Button>
          <Button size="1" variant="ghost" color="gray">
            Undo
          </Button>
        </>
      }
    >
      Your project settings have been updated successfully.
    </Alert>
  );
}
