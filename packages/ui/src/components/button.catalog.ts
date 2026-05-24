import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Button",
  tier: "Primitive",
  description: "Clickable button with style and size variants.",
  props: [
    { name: "variant", type: '"primary" | "outline" | "ghost" | "destructive"', required: false },
    { name: "size", type: '"sm" | "md" | "lg"', required: false },
    { name: "...button", type: 'ComponentPropsWithRef<"button">', required: false },
  ],
  examples: [
    { label: "primary", code: "<Button>Save</Button>" },
    { label: "outline large", code: '<Button variant="outline" size="lg">Cancel</Button>' },
    { label: "destructive", code: '<Button variant="destructive">Delete</Button>' },
  ],
  intent: {
    use: [
      "Triggering an action where the click is the primary event (submit, delete, run a handler).",
      "Adopting button styling on another element via buttonVariants().",
    ],
    avoid: [
      "Navigating to a URL — use a Next <Link> (optionally with buttonVariants()).",
      "Toggling a visible on/off state — use a Switch or Checkbox.",
    ],
  },
};
