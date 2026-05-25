import { Button, Hero } from "@monorepo-boilerplate/ui";

/** Hero introduces a page with a headline, supporting copy, and actions. */
export default function HeroExample() {
  return (
    <Hero
      title="Build faster with the kit"
      description="A themable Radix Themes design system, agent-ready, in a single import."
      actions={
        <>
          <Button size="3">Get started</Button>
          <Button size="3" variant="soft">
            Read the docs
          </Button>
        </>
      }
    />
  );
}
