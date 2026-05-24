import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "FormField",
  tier: "Recipe",
  description: "Labelled Input with optional description and error, accessibly wired.",
  props: [
    { name: "id", type: "string", required: true, description: "Ties label, input, and messages." },
    { name: "label", type: "ReactNode", required: true },
    { name: "description", type: "ReactNode", required: false },
    { name: "error", type: "ReactNode", required: false, description: "Sets aria-invalid." },
    { name: "...input", type: 'Omit<ComponentPropsWithRef<"input">, "id">', required: false },
  ],
  examples: [
    {
      label: "with error",
      code: '<FormField\n  id="email"\n  label="Email"\n  type="email"\n  description="We never share it."\n  error="Enter a valid email."\n/>',
    },
  ],
  intent: {
    use: [
      "Composing accessible form rows: label + input + helper/error in one unit.",
      "Server-rendered forms — it needs no client hooks (pass an explicit id).",
    ],
    avoid: ["Non-text controls — compose Select/Checkbox with their own label instead."],
  },
};
