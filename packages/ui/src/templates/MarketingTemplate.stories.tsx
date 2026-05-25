import type { Meta, StoryObj } from '@storybook/react-vite';

import MarketingTemplateExample from '../../examples/MarketingTemplate.example';
import { Cta, FeatureGrid, Hero } from '../blocks';
import { MarketingTemplate } from './MarketingTemplate';

const meta = {
  title: 'Templates/MarketingTemplate',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full marketing page: Navbar + Hero + FeatureGrid + TestimonialSection + Cta + FooterSection. */
export const Default: Story = {
  render: () => <MarketingTemplateExample />,
};

/** Minimal variant — no navbar or footer, just a Hero + FeatureGrid + Cta in the body slot. */
export const Minimal: Story = {
  render: () => (
    <MarketingTemplate>
      <Hero
        title="Ship your idea today"
        description="Everything you need to go from zero to production."
        actions={undefined}
      />
      <FeatureGrid
        features={[
          { title: 'Fast', description: 'Turborepo remote caching keeps builds instant.' },
          { title: 'Safe', description: 'Strict TypeScript across every package boundary.' },
          { title: 'Themable', description: 'Radix Themes tokens — one line to switch accent.' },
        ]}
      />
      <Cta
        title="Ready to build?"
        description="Fork the boilerplate and ship your first feature in minutes."
      />
    </MarketingTemplate>
  ),
};
