import { ActionPanel, Button, Flex } from '@monorepo-boilerplate/ui';

/** ActionPanel renders settings-row cards pairing a title + description with an action. */
export default function ActionPanelExample() {
  return (
    <Flex direction="column" gap="3" style={{ maxWidth: '42rem' }}>
      <ActionPanel
        title="Change plan"
        description="Upgrade or downgrade your subscription at any time. Changes take effect at the next billing cycle."
        action={<Button variant="outline">Change plan</Button>}
      />
      <ActionPanel
        title="Delete account"
        description="Permanently remove your account and all associated data. This action cannot be undone."
        action={
          <Button color="red" variant="soft">
            Delete account
          </Button>
        }
      />
    </Flex>
  );
}
