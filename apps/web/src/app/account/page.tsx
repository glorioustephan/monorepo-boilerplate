import { Card } from "@monorepo-boilerplate/ui";

import { getSession } from "@/lib/auth";

// Reachable only with a valid session — the proxy redirects otherwise. The
// null branch is defensive.
export default async function AccountPage() {
  const session = await getSession();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Account</h1>
      <Card className="text-center">
        {session ? (
          <p>
            Signed in as <span className="font-medium">{session.email}</span>
          </p>
        ) : (
          <p className="text-muted-foreground">Not signed in.</p>
        )}
      </Card>
    </main>
  );
}
