import type { Meta, StoryObj } from '@storybook/react-vite';

import PricingTemplateExample from '../../examples/PricingTemplate.example';
import { Cta, PricingSection } from '../blocks';
import { PricingTemplate } from './PricingTemplate';

const meta = {
  title: 'Templates/PricingTemplate',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full pricing page: Navbar + intro + PricingSection + FaqSection + Cta + FooterSection. */
export const Default: Story = {
  render: () => <PricingTemplateExample />,
};

/** Minimal variant — no navbar, footer, FAQ, or intro; only the pricing grid and a CTA. */
export const Minimal: Story = {
  render: () => (
    <PricingTemplate
      pricing={
        <PricingSection
          tiers={[
            {
              id: 'free',
              name: 'Free',
              price: '$0',
              priceSuffix: '/ month',
              features: ['1 project', '1 GB storage', 'Community support'],
              cta: (
                <button type="button" style={{ width: '100%' }}>
                  Get started
                </button>
              ),
            },
            {
              id: 'pro',
              name: 'Pro',
              price: '$19',
              priceSuffix: '/ month',
              features: ['Unlimited projects', '50 GB storage', 'Priority support'],
              highlighted: true,
              cta: (
                <button type="button" style={{ width: '100%' }}>
                  Start free trial
                </button>
              ),
            },
          ]}
        />
      }
      cta={<Cta title="Need a custom plan?" description="Talk to our sales team." />}
    />
  ),
};
