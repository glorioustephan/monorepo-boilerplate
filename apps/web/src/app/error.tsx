'use client';

import { Button } from '@monorepo-boilerplate/ui';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Wire this to your error reporter (Sentry, etc.). Logged for now.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">An unexpected error occurred. You can try again.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
