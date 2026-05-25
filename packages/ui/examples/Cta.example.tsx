import { Button, Cta } from "@monorepo-boilerplate/ui";

/** Cta closes a page with a focused call to action. */
export default function CtaExample() {
  return (
    <Cta
      title="Ready to build?"
      description="Fork the boilerplate and ship your first feature in minutes."
      actions={
        <>
          <Button size="3">Get started</Button>
          <Button size="3" variant="soft">
            Star on GitHub
          </Button>
        </>
      }
    />
  );
}
