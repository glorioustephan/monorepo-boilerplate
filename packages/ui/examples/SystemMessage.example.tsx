import { Flex, SystemMessage } from '@monorepo-boilerplate/ui';

/** SystemMessage demonstrates the three variants — action, error, and warning — plus a CTA. */
export default function SystemMessageExample() {
  return (
    <Flex direction="column" gap="3">
      <SystemMessage variant="action" cta={{ label: 'Learn more', onClick: () => undefined }}>
        The assistant searched the web and found 4 relevant sources.
      </SystemMessage>
      <SystemMessage variant="error">
        An error occurred while calling the tool. Please try again.
      </SystemMessage>
      <SystemMessage variant="warning" cta={{ label: 'Review', onClick: () => undefined }}>
        The response may be incomplete due to a context length limit.
      </SystemMessage>
    </Flex>
  );
}
