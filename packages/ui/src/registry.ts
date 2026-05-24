/**
 * Machine-readable component metadata. This is the seam the UI-kit MCP server
 * (mcp-servers/ui) reads so agents can discover components, props, variants,
 * and usage without scanning source. It is plain data — no React/CSS imports —
 * so it's safe to consume from a Node process.
 *
 * Keep entries in sync when adding components. A future iteration could generate
 * this from the source/types; for now it's hand-maintained and intentionally
 * design-system-agnostic.
 */

export interface ComponentProp {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly description?: string;
}

export interface ComponentVariant {
  readonly name: string;
  readonly values: readonly string[];
  readonly default?: string;
}

export interface ComponentMeta {
  readonly name: string;
  readonly description: string;
  readonly importPath: string;
  readonly sourcePath: string;
  readonly props: readonly ComponentProp[];
  readonly variants?: readonly ComponentVariant[];
  readonly example: string;
}

const IMPORT = "@monorepo-boilerplate/ui";

export const componentRegistry: readonly ComponentMeta[] = [
  {
    name: "Button",
    description: "Clickable button with style and size variants.",
    importPath: IMPORT,
    sourcePath: "src/components/button.tsx",
    props: [
      { name: "variant", type: '"primary" | "outline" | "ghost" | "destructive"', required: false },
      { name: "size", type: '"sm" | "md" | "lg"', required: false },
      { name: "...button", type: 'ComponentPropsWithRef<"button">', required: false },
    ],
    variants: [
      {
        name: "variant",
        values: ["primary", "outline", "ghost", "destructive"],
        default: "primary",
      },
      { name: "size", values: ["sm", "md", "lg"], default: "md" },
    ],
    example: '<Button variant="outline" size="lg">Save</Button>',
  },
  {
    name: "Card",
    description: "Bordered surface container for grouping content.",
    importPath: IMPORT,
    sourcePath: "src/components/card.tsx",
    props: [{ name: "...div", type: 'ComponentPropsWithRef<"div">', required: false }],
    example: "<Card>Content</Card>",
  },
  {
    name: "Input",
    description: "Text input styled with the kit's semantic tokens.",
    importPath: IMPORT,
    sourcePath: "src/components/input.tsx",
    props: [{ name: "...input", type: 'ComponentPropsWithRef<"input">', required: false }],
    example: '<label htmlFor="email">Email<Input id="email" type="email" /></label>',
  },
  {
    name: "Badge",
    description: "Small status/label pill with variants. Renders a <span>.",
    importPath: IMPORT,
    sourcePath: "src/components/badge.tsx",
    props: [
      { name: "variant", type: '"default" | "outline" | "muted"', required: false },
      { name: "...span", type: 'ComponentPropsWithRef<"span">', required: false },
    ],
    variants: [{ name: "variant", values: ["default", "outline", "muted"], default: "default" }],
    example: '<Badge variant="muted">Beta</Badge>',
  },
];

export function listComponents(): ReadonlyArray<{ name: string; description: string }> {
  return componentRegistry.map(({ name, description }) => ({ name, description }));
}

export function getComponent(name: string): ComponentMeta | undefined {
  const target = name.toLowerCase();
  return componentRegistry.find((component) => component.name.toLowerCase() === target);
}
