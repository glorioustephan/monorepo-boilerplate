/*
 * Component manifest — the single source of truth for the kit's Radix Themes re-export layer.
 *
 * Each entry describes a Radix Themes atom the kit re-exports. `pnpm ui:codegen`
 * reads this file and generates, per component: a thin re-export module (`<Name>.tsx`)
 * and (for non-compound atoms) a reference Storybook file (`<Name>.stories.tsx`).
 * The UI MCP server also reads this manifest when building its catalog. Edit here,
 * never the generated files.
 */

export type RenderEnv = "server" | "client" | "universal";

/** A variant axis rendered as its own matrix story (one row per value). */
export interface ComponentAxis {
  readonly prop: string;
  readonly values: readonly string[];
}

export interface ComponentSpec {
  /** Kit export name (PascalCase). */
  readonly name: string;
  /** Export name in `@radix-ui/themes` (defaults to `name`). */
  readonly radixName?: string;
  /** Storybook group + catalog category, e.g. "Layout". */
  readonly category: string;
  /** Where the atom can render (catalog metadata). */
  readonly renderEnv: RenderEnv;
  /** One-line when-to-use guidance (emitted as JSDoc; seeds the catalog description). */
  readonly usage: string;
  /**
   * Name of the Radix prop type to re-export (defaults to `${radixName}Props`).
   * Set `false` for compound atoms that don't export a single props type.
   */
  readonly propsType?: string | false;
  /**
   * Compound atom: a namespace object (e.g. `Dialog.Root/Trigger/Content`), not a
   * directly-renderable component. Codegen emits a value-only re-export and skips the
   * generated story (hand-author `<Name>.stories.tsx` — the banner-safe prune keeps it).
   */
  readonly compound?: boolean;
  /**
   * Skip the generated story for a non-compound atom that can't render generically
   * (e.g. Tooltip needs a `content` prop + child). Hand-author its story.
   */
  readonly manualStory?: boolean;
  /** Compound sub-parts re-exported on the namespace (e.g. `["Root","Trigger","Content"]`). */
  readonly parts?: readonly string[];
  /** Sample children text for the Default story; omit to render the atom self-closing. */
  readonly sample?: string;
  /** Raw JSX attributes injected into every story instance (e.g. `'fallback="A"'`, `'value={60}'`). */
  readonly sampleProps?: string;
  /**
   * Raw object literal emitted as the story `meta.args` (e.g. `'{ fallback: "A" }'`).
   * Required for atoms with mandatory props, so CSF3 stories typecheck.
   */
  readonly metaArgs?: string;
  /** Variant axes → generated matrix stories. Omit for structural/compound atoms. */
  readonly axes?: readonly ComponentAxis[];
}

const SIZE_1_3 = ["1", "2", "3"];
const SIZE_1_4 = ["1", "2", "3", "4"];
const BUTTON_VARIANTS = ["classic", "solid", "soft", "surface", "outline", "ghost"];
const INPUT_VARIANTS = ["classic", "surface", "soft"];
const ACCENTS = ["indigo", "crimson", "grass", "amber"];

export const components: readonly ComponentSpec[] = [
  // ---------- Layout ----------
  {
    name: "Box",
    category: "Layout",
    renderEnv: "universal",
    sample: "Box",
    usage: "Generic layout block with Radix spacing/sizing props. Renders a <div>.",
  },
  {
    name: "Flex",
    category: "Layout",
    renderEnv: "universal",
    sample: "Flex",
    usage: "Flexbox container: direction, align, justify, wrap, gap (responsive).",
  },
  {
    name: "Grid",
    category: "Layout",
    renderEnv: "universal",
    sample: "Grid",
    usage: "CSS grid container: columns, rows, flow, gap (responsive).",
  },
  {
    name: "Container",
    category: "Layout",
    renderEnv: "universal",
    sample: "Container",
    usage: "Constrains content to a max-width and centers it. Sizes 1–4.",
  },
  {
    name: "Section",
    category: "Layout",
    renderEnv: "universal",
    sample: "Section",
    usage: "Vertical page band with size-based vertical padding (1–4).",
  },
  {
    name: "Separator",
    category: "Layout",
    renderEnv: "universal",
    usage: "Thin divider between content; horizontal or vertical, sized and colorable.",
    axes: [{ prop: "size", values: SIZE_1_4 }],
  },
  {
    name: "ScrollArea",
    category: "Layout",
    renderEnv: "client",
    sample: "Scrollable content",
    usage: "Scrollable region with styled scrollbars. Constrain its size to scroll.",
  },
  {
    name: "Inset",
    category: "Layout",
    renderEnv: "universal",
    sample: "Inset",
    usage: "Bleeds a child to the edges of a padded parent (e.g. Card), cancelling padding.",
  },
  {
    name: "AspectRatio",
    category: "Layout",
    renderEnv: "universal",
    sample: "16 / 9",
    usage: "Constrains its child to a fixed width:height ratio.",
  },

  // ---------- Typography ----------
  {
    name: "Text",
    category: "Typography",
    renderEnv: "universal",
    sample: "The quick brown fox jumps over the lazy dog.",
    usage: "Body text with size (1–9), weight, and color. Renders span/div/label/p.",
    axes: [
      { prop: "size", values: ["1", "2", "3", "4", "5", "6"] },
      { prop: "weight", values: ["light", "regular", "medium", "bold"] },
    ],
  },
  {
    name: "Heading",
    category: "Typography",
    renderEnv: "universal",
    sample: "Heading",
    usage: "Section heading with size (1–9) and weight. Renders an <h1>–<h6>.",
    axes: [{ prop: "size", values: ["3", "4", "5", "6", "7", "8"] }],
  },
  {
    name: "Blockquote",
    category: "Typography",
    renderEnv: "universal",
    sample: "Design is not just what it looks like — it is how it works.",
    usage: "Block quotation with size, weight, and color.",
    axes: [{ prop: "size", values: ["2", "3", "4", "5"] }],
  },
  {
    name: "Code",
    category: "Typography",
    renderEnv: "universal",
    sample: "const x = 1",
    usage: "Inline code with variant (solid/soft/outline/ghost), size, and color.",
    axes: [
      { prop: "variant", values: ["solid", "soft", "outline", "ghost"] },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "Em",
    category: "Typography",
    renderEnv: "universal",
    sample: "emphasized",
    usage: "Emphasized (italic) inline text. Renders an <em>.",
  },
  {
    name: "Kbd",
    category: "Typography",
    renderEnv: "universal",
    sample: "⌘K",
    usage: "Keyboard input hint. Renders a <kbd>.",
    axes: [{ prop: "size", values: ["1", "3", "5"] }],
  },
  {
    name: "Link",
    category: "Typography",
    renderEnv: "universal",
    sample: "Link",
    usage:
      "Styled anchor with underline behavior, size, weight, and color. Use asChild for routing links.",
    axes: [
      { prop: "underline", values: ["auto", "always", "hover", "none"] },
      { prop: "size", values: ["2", "3", "4"] },
    ],
  },
  {
    name: "Quote",
    category: "Typography",
    renderEnv: "universal",
    sample: "a quoted phrase",
    usage: "Short inline quotation. Renders a <q>.",
  },
  {
    name: "Strong",
    category: "Typography",
    renderEnv: "universal",
    sample: "strong",
    usage: "Bold inline text. Renders a <strong>.",
  },

  // ---------- Forms ----------
  {
    name: "Button",
    category: "Forms",
    renderEnv: "universal",
    sample: "Button",
    usage: "Action trigger. variant × size × color; supports asChild for links.",
    axes: [
      { prop: "variant", values: BUTTON_VARIANTS },
      { prop: "size", values: SIZE_1_4 },
      { prop: "color", values: ACCENTS },
    ],
  },
  {
    name: "IconButton",
    category: "Forms",
    renderEnv: "universal",
    sample: "+",
    usage: "Square button for a single icon. variant × size × color.",
    axes: [
      { prop: "variant", values: BUTTON_VARIANTS },
      { prop: "size", values: SIZE_1_4 },
      { prop: "color", values: ACCENTS },
    ],
  },
  {
    name: "TextField",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Slot"],
    usage:
      "Single-line text input. Compose TextField.Root with optional TextField.Slot adornments.",
  },
  {
    name: "TextArea",
    category: "Forms",
    renderEnv: "client",
    sampleProps: 'placeholder="Write…"',
    usage: "Multi-line text input. variant × size.",
    axes: [
      { prop: "variant", values: INPUT_VARIANTS },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "Select",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Trigger", "Content", "Item", "Group", "Label", "Separator"],
    usage: "Dropdown single-select. Compose Select.Root/Trigger/Content/Item.",
  },
  {
    name: "Checkbox",
    category: "Forms",
    renderEnv: "client",
    sampleProps: "defaultChecked",
    usage: "Boolean checkbox. variant × size × color.",
    axes: [
      { prop: "variant", values: INPUT_VARIANTS },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "CheckboxGroup",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Item"],
    usage: "Group of related checkboxes. Compose CheckboxGroup.Root/Item.",
  },
  {
    name: "CheckboxCards",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Item"],
    usage: "Selectable checkbox cards. Compose CheckboxCards.Root/Item.",
  },
  {
    name: "RadioGroup",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Item"],
    usage: "Single-choice radio group. Compose RadioGroup.Root/Item.",
  },
  {
    name: "Radio",
    category: "Forms",
    renderEnv: "client",
    sampleProps: 'value="a" defaultChecked',
    metaArgs: '{ value: "a" }',
    usage: "A standalone radio input (usually used via RadioGroup). variant × size.",
    axes: [
      { prop: "variant", values: INPUT_VARIANTS },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "RadioCards",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Item"],
    usage: "Selectable radio cards. Compose RadioCards.Root/Item.",
  },
  {
    name: "Switch",
    category: "Forms",
    renderEnv: "client",
    usage: "Boolean on/off toggle. variant × size × color.",
    axes: [
      { prop: "variant", values: INPUT_VARIANTS },
      { prop: "size", values: SIZE_1_3 },
      { prop: "color", values: ACCENTS },
    ],
  },
  {
    name: "Slider",
    category: "Forms",
    renderEnv: "client",
    sampleProps: "defaultValue={[50]}",
    usage: "Range slider. variant × size × color.",
    axes: [
      { prop: "variant", values: INPUT_VARIANTS },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "SegmentedControl",
    category: "Forms",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Item"],
    usage: "Single-select segmented toggle. Compose SegmentedControl.Root/Item.",
  },

  // ---------- Data display ----------
  {
    name: "Avatar",
    category: "Data Display",
    renderEnv: "universal",
    sampleProps: 'fallback="A"',
    metaArgs: '{ fallback: "A" }',
    usage: "User/image avatar with a fallback. variant × size × color.",
    axes: [
      { prop: "variant", values: ["solid", "soft"] },
      { prop: "size", values: ["1", "2", "3", "4", "5"] },
      { prop: "color", values: ACCENTS },
    ],
  },
  {
    name: "Badge",
    category: "Data Display",
    renderEnv: "universal",
    sample: "Badge",
    usage: "Small status/label pill. variant × size × color.",
    axes: [
      { prop: "variant", values: ["solid", "soft", "surface", "outline"] },
      { prop: "size", values: SIZE_1_3 },
      { prop: "color", values: ACCENTS },
    ],
  },
  {
    name: "Card",
    category: "Data Display",
    renderEnv: "universal",
    sample: "Card",
    usage: "Elevated surface container. variant × size.",
    axes: [
      { prop: "variant", values: ["surface", "classic", "ghost"] },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "DataList",
    category: "Data Display",
    renderEnv: "universal",
    compound: true,
    parts: ["Root", "Item", "Label", "Value"],
    usage: "Key/value metadata list. Compose DataList.Root/Item/Label/Value.",
  },
  {
    name: "Table",
    category: "Data Display",
    renderEnv: "universal",
    compound: true,
    parts: ["Root", "Header", "Body", "Row", "ColumnHeaderCell", "RowHeaderCell", "Cell"],
    usage: "Data table. Compose Table.Root/Header/Body/Row/Cell.",
  },
  {
    name: "Callout",
    category: "Data Display",
    renderEnv: "universal",
    compound: true,
    parts: ["Root", "Icon", "Text"],
    usage: "Highlighted informational message. Compose Callout.Root/Icon/Text.",
  },
  {
    name: "Progress",
    category: "Data Display",
    renderEnv: "universal",
    sampleProps: "value={60}",
    usage: "Determinate/indeterminate progress bar. variant × size × color.",
    axes: [
      { prop: "variant", values: INPUT_VARIANTS },
      { prop: "size", values: SIZE_1_3 },
    ],
  },
  {
    name: "Skeleton",
    category: "Data Display",
    renderEnv: "universal",
    sample: "Loading placeholder",
    usage: "Shimmer placeholder while content loads; wraps its children to match their size.",
  },
  {
    name: "Spinner",
    category: "Data Display",
    renderEnv: "universal",
    usage: "Indeterminate loading spinner.",
    axes: [{ prop: "size", values: SIZE_1_3 }],
  },

  // ---------- Overlays & Navigation (compound — hand-authored stories) ----------
  {
    name: "Dialog",
    category: "Overlays",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Trigger", "Content", "Title", "Description", "Close"],
    usage: "Modal dialog. Compose Dialog.Root/Trigger/Content/Title/Description/Close.",
  },
  {
    name: "AlertDialog",
    category: "Overlays",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Trigger", "Content", "Title", "Description", "Action", "Cancel"],
    usage:
      "Confirmation dialog that interrupts. Compose AlertDialog.Root/Trigger/Content/Action/Cancel.",
  },
  {
    name: "Popover",
    category: "Overlays",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Trigger", "Content", "Close", "Anchor"],
    usage: "Floating panel anchored to a trigger. Compose Popover.Root/Trigger/Content.",
  },
  {
    name: "HoverCard",
    category: "Overlays",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Trigger", "Content"],
    usage: "Preview card shown on hover. Compose HoverCard.Root/Trigger/Content.",
  },
  {
    name: "Tooltip",
    category: "Overlays",
    renderEnv: "client",
    manualStory: true,
    usage: "Short hover/focus hint. Wraps a child and takes a `content` prop.",
  },
  {
    name: "DropdownMenu",
    category: "Navigation",
    renderEnv: "client",
    compound: true,
    parts: [
      "Root",
      "Trigger",
      "Content",
      "Item",
      "Group",
      "Label",
      "CheckboxItem",
      "RadioGroup",
      "RadioItem",
      "Separator",
      "Sub",
      "SubTrigger",
      "SubContent",
    ],
    usage: "Button-triggered menu. Compose DropdownMenu.Root/Trigger/Content/Item.",
  },
  {
    name: "ContextMenu",
    category: "Navigation",
    renderEnv: "client",
    compound: true,
    parts: [
      "Root",
      "Trigger",
      "Content",
      "Item",
      "Group",
      "Label",
      "CheckboxItem",
      "RadioGroup",
      "RadioItem",
      "Separator",
      "Sub",
      "SubTrigger",
      "SubContent",
    ],
    usage: "Right-click menu. Compose ContextMenu.Root/Trigger/Content/Item.",
  },
  {
    name: "Tabs",
    category: "Navigation",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "List", "Trigger", "Content"],
    usage: "Tabbed panels. Compose Tabs.Root/List/Trigger/Content.",
  },
  {
    name: "TabNav",
    category: "Navigation",
    renderEnv: "client",
    compound: true,
    parts: ["Root", "Link"],
    usage: "Navigation tabs backed by links (for routing). Compose TabNav.Root/Link.",
  },
];
