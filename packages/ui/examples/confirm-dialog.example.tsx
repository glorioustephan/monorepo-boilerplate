"use client";

import { Button, ConfirmDialog } from "@monorepo-boilerplate/ui";

export default function ConfirmDialogExample() {
  return (
    <ConfirmDialog
      trigger={<Button variant="destructive">Delete project</Button>}
      title="Delete project?"
      description="This permanently removes the project and cannot be undone."
      confirmLabel="Delete"
      destructive
      onConfirm={() => {
        // Replace with a real mutation in your app.
      }}
    />
  );
}
