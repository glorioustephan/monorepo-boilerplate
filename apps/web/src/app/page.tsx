import { Button, Cta, FeatureGrid, Hero } from '@monorepo-boilerplate/ui';

const features = [
  { title: 'Themable', description: 'Switch accent, gray, radius, and scaling at runtime.' },
  { title: 'Agent-ready', description: 'An MCP catalog exposes every component to tooling.' },
  { title: 'Type-safe', description: 'Strict TypeScript and source-consumed HMR across packages.' },
];

export default function HomePage() {
  return (
    <>
      <Hero
        title="Hello, monorepo 👋"
        description="A themable Radix Themes design system, consumed from source — try the theme switcher above."
        actions={
          <>
            <Button size="3">Get started</Button>
            <Button size="3" variant="soft">
              Read the docs
            </Button>
          </>
        }
      />
      <FeatureGrid features={features} />
      <Cta
        title="Ready to build?"
        description="Fork the boilerplate and ship your first feature in minutes."
        actions={<Button size="3">Get started</Button>}
      />
    </>
  );
}
