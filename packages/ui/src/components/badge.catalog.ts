import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Badge",
  tier: "Primitive",
  description: "Small status/label pill with variants. Renders a <span>.",
  props: [
    { name: "variant", type: '"default" | "outline" | "muted"', required: false },
    { name: "...span", type: 'ComponentPropsWithRef<"span">', required: false },
  ],
  examples: [
    { label: "default", code: "<Badge>New</Badge>" },
    { label: "muted", code: '<Badge variant="muted">Beta</Badge>' },
  ],
  intent: {
    use: ["Compact status or category labels inline with text or in lists."],
    avoid: ["Interactive actions — a Badge is non-interactive; use a Button."],
  },
};
