import { Box, Tabs, Text } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Navigation/Tabs',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Box pt="3">
        <Tabs.Content value="account">
          <Text size="2">Make changes to your account.</Text>
        </Tabs.Content>
        <Tabs.Content value="documents">
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>
        <Tabs.Content value="settings">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  ),
};
