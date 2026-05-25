import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
  Button,
  Cta,
  FaqSection,
  FooterSection,
  Heading,
  Navbar,
  PricingSection,
  PricingTemplate,
} from '@monorepo-boilerplate/ui';
import type { FaqItem, PricingPeriod, PricingTier } from '@monorepo-boilerplate/ui';

const links = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing', active: true },
  { label: 'Docs', href: '/docs' },
] as const;

const periods: readonly PricingPeriod[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
];

const tiers: readonly PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Everything you need to get started.',
    price: { monthly: '$9', annual: '$7' },
    priceSuffix: '/ month',
    features: ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'],
    cta: (
      <Button variant="outline" size="3" style={{ width: '100%' }}>
        Get started
      </Button>
    ),
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that need more power.',
    price: { monthly: '$29', annual: '$23' },
    priceSuffix: '/ month',
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    cta: (
      <Button variant="solid" size="3" style={{ width: '100%' }}>
        Start free trial
      </Button>
    ),
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Dedicated infrastructure and white-glove onboarding.',
    price: { monthly: '$99', annual: '$79' },
    priceSuffix: '/ month',
    features: [
      'Unlimited projects',
      '1 TB storage',
      'Enterprise analytics',
      'Dedicated account manager',
      'SSO & SAML',
      'SLA guarantee',
    ],
    cta: (
      <Button variant="outline" size="3" style={{ width: '100%' }}>
        Contact sales
      </Button>
    ),
  },
];

const faqItems: readonly FaqItem[] = [
  {
    id: 'trial',
    question: 'Do you offer a free trial?',
    answer:
      'Yes — every plan includes a 14-day free trial with no credit card required. Upgrade, downgrade, or cancel at any time.',
  },
  {
    id: 'billing',
    question: 'How does billing work?',
    answer:
      'You are billed monthly or annually. Annual plans include a 20% discount. Invoices are sent to your registered email at the start of each billing cycle.',
  },
  {
    id: 'seats',
    question: 'Can I add team members?',
    answer:
      'All paid plans support multiple seats. Invite teammates from the Members page and assign them Admin, Editor, or Viewer roles.',
  },
  {
    id: 'cancel',
    question: 'What happens if I cancel?',
    answer:
      'Your data remains accessible for 30 days after cancellation so you can export anything you need. After that, all data is permanently deleted.',
  },
];

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
  },
] as const;

/** PricingTemplate composing Navbar + title/description + PricingSection + FaqSection + Cta + FooterSection. */
export default function PricingTemplateExample() {
  return (
    <PricingTemplate
      navbar={
        <Navbar
          brand={<Heading size="4">Acme</Heading>}
          links={links}
          menuIcon={<HamburgerMenuIcon />}
          actions={
            <Button size="2" variant="outline">
              Sign in
            </Button>
          }
        />
      }
      title="Simple, transparent pricing"
      description="Start free. Upgrade when you're ready. No hidden fees."
      pricing={<PricingSection tiers={tiers} periods={periods} />}
      faq={
        <FaqSection
          title="Frequently asked questions"
          description="Everything you need to know about the product and billing."
          items={faqItems}
        />
      }
      cta={
        <Cta
          title="Still have questions?"
          description="Talk to our team — we're happy to help you find the right plan."
          actions={
            <Button size="3" variant="solid">
              Contact sales
            </Button>
          }
        />
      }
      footer={<FooterSection brand={<Heading size="3">Acme</Heading>} groups={footerGroups} />}
    />
  );
}
