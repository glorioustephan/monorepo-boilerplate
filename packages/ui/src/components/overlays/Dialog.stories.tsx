import { Button, Dialog, Flex, Text, TextField } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Overlays/Dialog',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <Flex direction="column" gap="3">
          <Text as="label" htmlFor="dialog-name" size="2" weight="bold">
            Name
          </Text>
          <TextField.Root
            id="dialog-name"
            defaultValue="Ada Lovelace"
            placeholder="Enter your full name"
          />
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
