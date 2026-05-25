import { Button, Drawer, Field, Flex, TextField } from '@monorepo-boilerplate/ui';

/** Drawer slides a contextual panel in from the side — here, an edit-profile form. */
export default function DrawerExample() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <Button>Edit profile</Button>
      </Drawer.Trigger>
      <Drawer.Content
        title="Edit profile"
        description="Update your details. Changes are saved when you click Save."
        footer={
          <Flex gap="3" justify="end">
            <Drawer.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Drawer.Close>
            <Drawer.Close>
              <Button>Save</Button>
            </Drawer.Close>
          </Flex>
        }
      >
        <Flex direction="column" gap="4">
          <Field label="Name" htmlFor="drawer-name">
            <TextField.Root id="drawer-name" defaultValue="Ada Lovelace" />
          </Field>
          <Field label="Email" htmlFor="drawer-email">
            <TextField.Root id="drawer-email" type="email" defaultValue="ada@example.com" />
          </Field>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  );
}
