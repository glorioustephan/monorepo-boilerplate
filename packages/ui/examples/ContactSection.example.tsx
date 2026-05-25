import { ContactSection, Flex, Heading, Link, Text } from '@monorepo-boilerplate/ui';
import { EnvelopeClosedIcon, HomeIcon, MobileIcon } from '@radix-ui/react-icons';

/** Side-by-side contact section: info panel left, form right. */
export default function ContactSectionExample() {
  return (
    <ContactSection
      title="Get in touch"
      description="We'd love to hear from you. Send us a message and we'll get back to you as soon as possible."
      submitLabel="Send message"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      aside={
        <Flex direction="column" gap="5">
          <Heading as="h3" size="4">
            Contact details
          </Heading>
          <Flex direction="column" gap="3">
            <Flex align="center" gap="2">
              <HomeIcon />
              <Text size="2">123 Boilerplate Ave, San Francisco, CA 94107</Text>
            </Flex>
            <Flex align="center" gap="2">
              <MobileIcon />
              <Text size="2">+1 (555) 000-0000</Text>
            </Flex>
            <Flex align="center" gap="2">
              <EnvelopeClosedIcon />
              <Link size="2" href="mailto:hello@example.com">
                hello@example.com
              </Link>
            </Flex>
          </Flex>
        </Flex>
      }
    />
  );
}
