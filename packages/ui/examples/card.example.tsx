import { Card } from "@monorepo-boilerplate/ui";

export default function CardExample() {
  return (
    <Card className="flex max-w-sm flex-col gap-2">
      <h3 className="text-lg font-semibold">Card title</h3>
      <p className="text-sm text-muted-foreground">
        A bordered surface for grouping related content.
      </p>
    </Card>
  );
}
