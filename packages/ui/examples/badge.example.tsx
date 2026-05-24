import { Badge } from "@monorepo-boilerplate/ui";

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>New</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Beta</Badge>
    </div>
  );
}
