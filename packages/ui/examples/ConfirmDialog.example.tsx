import { Button, ConfirmDialog } from "@monorepo-boilerplate/ui";

/** ConfirmDialog gates a destructive action behind a confirm/cancel prompt. */
export default function ConfirmDialogExample() {
  return (
    <ConfirmDialog
      trigger={<Button color="red">Delete account</Button>}
      title="Delete account?"
      description="This permanently removes your account and all of its data. This action cannot be undone."
      confirmLabel="Delete"
      onConfirm={() => {
        // perform the destructive action
      }}
    />
  );
}
