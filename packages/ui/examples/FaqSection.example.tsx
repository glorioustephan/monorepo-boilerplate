import { FaqSection } from '@monorepo-boilerplate/ui';

const ITEMS = [
  {
    id: 'trial',
    question: 'Do you offer a free trial?',
    answer:
      'Yes — every plan includes a 14-day free trial with no credit card required. You can upgrade, downgrade, or cancel at any time from your account settings.',
  },
  {
    id: 'billing',
    question: 'How does billing work?',
    answer:
      'You are billed monthly or annually depending on the plan you choose. Annual plans include a 20% discount. Invoices are sent automatically to your registered email address at the start of each billing cycle.',
  },
  {
    id: 'seats',
    question: 'Can I add team members to my account?',
    answer:
      'Absolutely. All paid plans support multiple seats. You can invite teammates from the Members page in your dashboard and assign them roles such as Admin, Editor, or Viewer.',
  },
  {
    id: 'data',
    question: 'What happens to my data if I cancel?',
    answer:
      'Your data remains accessible for 30 days after cancellation so you can export anything you need. After that period, all data is permanently deleted from our servers in accordance with our privacy policy.',
  },
] as const;

/** FaqSectionExample — realistic SaaS FAQ demonstrating the centered accordion block. */
export default function FaqSectionExample() {
  return (
    <FaqSection
      title="Frequently asked questions"
      description="Everything you need to know about the product and billing."
      items={ITEMS}
    />
  );
}
