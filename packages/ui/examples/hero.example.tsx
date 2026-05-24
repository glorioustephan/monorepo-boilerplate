import { Button, Hero } from "@monorepo-boilerplate/ui";

export default function HeroExample() {
  return (
    <Hero
      title="Build your next monorepo faster"
      description="An opinionated Turborepo + pnpm starter with a typed component catalog."
      actions={
        <>
          <Button>Get started</Button>
          <Button variant="outline">Read the docs</Button>
        </>
      }
    />
  );
}
