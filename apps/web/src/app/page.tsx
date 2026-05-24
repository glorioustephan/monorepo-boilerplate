import { Button, Card } from "@monorepo-boilerplate/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Hello, monorepo 👋</h1>
      <Card className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground">
          This page renders a <code>Button</code> from <code>@monorepo-boilerplate/ui</code>,
          consumed directly from source so edits hot-reload across package boundaries.
        </p>
        <Button>Get started</Button>
      </Card>
    </main>
  );
}
