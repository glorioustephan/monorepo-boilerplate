import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Button,
  Cta,
  FeatureGrid,
  FooterSection,
  Heading,
  Hero,
  MarketingTemplate,
  Navbar,
  TestimonialSection,
} from '@monorepo-boilerplate/ui';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
] as const;

const features = [
  {
    title: 'Agent-ready MCP catalog',
    description: 'Every component is indexed and queryable by AI coding agents via the MCP server.',
  },
  {
    title: 'Themable at runtime',
    description: 'Swap accent, gray, radius, and scaling without touching code.',
  },
  {
    title: 'Strict TypeScript',
    description: 'Full strict mode with noUncheckedIndexedAccess across every package.',
  },
  {
    title: 'HMR across packages',
    description: 'Internal packages are consumed from source — changes hot-reload instantly.',
  },
  {
    title: 'Turborepo + pnpm',
    description: 'Remote caching, task pipelines, and catalog version management out of the box.',
  },
  {
    title: 'Radix Themes',
    description: 'Accessible, composable primitives with a curated token system.',
  },
] as const;

const testimonials = [
  {
    id: 'alice',
    quote: 'This kit saved us weeks of setup. The Radix Themes integration is seamless.',
    authorName: 'Alice Hoffman',
    authorTitle: 'CTO, Shipfast',
    avatar: <Avatar fallback="AH" />,
    rating: 5 as const,
  },
  {
    id: 'ben',
    quote: 'The monorepo conventions kept our team aligned from day one.',
    authorName: 'Ben Torres',
    authorTitle: 'Lead Engineer, Acme Corp',
    avatar: <Avatar fallback="BT" />,
    rating: 5 as const,
  },
] as const;

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com' },
    ],
  },
] as const;

/** MarketingTemplate composing Navbar + Hero + FeatureGrid + TestimonialSection + Cta + FooterSection. */
export default function MarketingTemplateExample() {
  return (
    <MarketingTemplate
      navbar={
        <Navbar
          brand={<Heading size="4">Acme</Heading>}
          links={links}
          menuIcon={<HamburgerMenuIcon />}
          actions={
            <Button size="2" variant="solid">
              Get started
            </Button>
          }
        />
      }
      footer={<FooterSection brand={<Heading size="3">Acme</Heading>} groups={footerGroups} />}
    >
      <Hero
        title="Build faster with the kit"
        description="A themable Radix Themes design system, agent-ready, in a single import."
        actions={
          <>
            <Button size="3" variant="solid">
              Get started
            </Button>
            <Button size="3" variant="outline">
              View docs
            </Button>
          </>
        }
      />
      <FeatureGrid features={features} />
      <TestimonialSection title="What our customers say" testimonials={testimonials} />
      <Cta
        title="Ready to build?"
        description="Fork the boilerplate and ship your first feature in minutes."
        actions={
          <Button size="3" variant="solid">
            Get started free
          </Button>
        }
      />
    </MarketingTemplate>
  );
}
