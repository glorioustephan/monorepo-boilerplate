import { Collapsible, Flex, Text } from '@monorepo-boilerplate/ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';

/** Collapsible reveals supporting content behind an accessible toggle — here, an FAQ entry. */
export default function CollapsibleExample() {
  return (
    <Collapsible
      defaultOpen
      trigger={({ open }) => (
        <Flex align="center" justify="between" gap="3" py="2" width="100%">
          <Text weight="medium">Do you offer a free trial?</Text>
          <ChevronDownIcon
            style={{
              transform: open ? 'rotate(180deg)' : undefined,
              transition: 'transform 200ms',
            }}
          />
        </Flex>
      )}
    >
      <Text as="p" color="gray" size="2">
        Yes — every plan includes a 14-day free trial with no credit card required. You can upgrade,
        downgrade, or cancel at any time from your account settings.
      </Text>
    </Collapsible>
  );
}
