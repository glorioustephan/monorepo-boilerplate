import { Button, Cta } from "@monorepo-boilerplate/ui";

export default function CtaExample() {
  return (
    <Cta
      title="Ready to build?"
      description="Fork the template and start shipping today."
      actions={<Button>Use this template</Button>}
    />
  );
}
