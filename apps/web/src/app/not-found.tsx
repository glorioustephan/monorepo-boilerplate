import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">404 — Not found</h1>
      <p className="text-muted-foreground">That page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        Go home
      </Link>
    </main>
  );
}
