import { Button, LandingTemplate } from '@monorepo-boilerplate/ui';

const features = [
  { title: 'Themable', description: 'Switch accent, gray, radius, and scaling at runtime.' },
  { title: 'Agent-ready', description: 'An MCP catalog exposes every component to tooling.' },
  { title: 'Type-safe', description: 'Strict TypeScript and source-consumed HMR across packages.' },
];

/** LandingTemplate composes Hero + FeatureGrid + Cta into a full page. */
export default function LandingTemplateExample() {
  return (
    <LandingTemplate
      title="Build faster with the kit"
      description="A themable Radix Themes design system, agent-ready, in a single import."
      actions={<Button size="3">Get started</Button>}
      features={features}
      cta={{
        title: 'Ready to build?',
        description: 'Fork the boilerplate and ship your first feature in minutes.',
        actions: <Button size="3">Get started</Button>,
      }}
    />
  );
}
