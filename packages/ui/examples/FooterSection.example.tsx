import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Flex, FooterSection, Heading, IconButton, Text } from '@monorepo-boilerplate/ui';
import type { FooterGroup } from '@monorepo-boilerplate/ui';

const groups: readonly FooterGroup[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Analytics', href: '/solutions/analytics' },
      { label: 'Automation', href: '/solutions/automation' },
      { label: 'Commerce', href: '/solutions/commerce' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Pricing', href: '/support/pricing' },
      { label: 'Documentation', href: '/support/docs' },
      { label: 'Guides', href: '/support/guides' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/company/about' },
      { label: 'Blog', href: '/company/blog' },
      { label: 'Careers', href: '/company/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
    ],
  },
];

/** FooterSection with brand, four link groups, copyright, and social icons. */
export default function FooterSectionExample() {
  return (
    <FooterSection
      groups={groups}
      brand={<Heading size="4">Acme</Heading>}
      bottom={
        <Flex align="center" justify="between" wrap="wrap" gap="4">
          <Text size="2" color="gray">
            &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
          </Text>
          <Flex align="center" gap="3">
            <IconButton variant="ghost" aria-label="GitHub">
              <GitHubLogoIcon />
            </IconButton>
            <IconButton variant="ghost" aria-label="Twitter">
              <TwitterLogoIcon />
            </IconButton>
          </Flex>
        </Flex>
      }
    />
  );
}
