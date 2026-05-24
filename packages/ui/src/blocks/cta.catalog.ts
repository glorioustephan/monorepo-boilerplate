import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Cta",
  tier: "Block",
  description: "Closing call-to-action panel on an elevated surface with an action slot.",
  props: [
    { name: "title", type: "ReactNode", required: true },
    { name: "description", type: "ReactNode", required: false },
    { name: "actions", type: "ReactNode", required: false, description: "Action controls slot." },
    { name: "className", type: "string", required: false },
  ],
  examples: [
    {
      label: "default",
      code: '<Cta\n  title="Ready to build?"\n  description="Fork the template and start shipping."\n  actions={<Button>Use this template</Button>}\n/>',
    },
  ],
  intent: {
    use: ["Driving a single conversion near the end of a page (sign up, contact, start)."],
    avoid: ["Competing CTAs — keep one primary action so the choice stays clear."],
  },
};
