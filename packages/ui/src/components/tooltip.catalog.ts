import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Tooltip",
  tier: "Primitive",
  description: "Hover/focus tooltip (Radix). Requires a TooltipProvider ancestor.",
  props: [
    {
      name: "TooltipContent",
      type: "ComponentPropsWithRef<typeof Tooltip.Content>",
      required: false,
    },
  ],
  examples: [
    {
      label: "basic",
      code: "<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger>Hover</TooltipTrigger>\n    <TooltipContent>Hint</TooltipContent>\n  </Tooltip>\n</TooltipProvider>",
    },
  ],
  intent: {
    use: ["Short, transient hints on hover/focus for an already-labelled control."],
    avoid: ["Essential information (tooltips are not reliably reachable on touch)."],
  },
};
