import { FormField } from "@monorepo-boilerplate/ui";

export default function FormFieldExample() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <FormField id="name" label="Full name" placeholder="Ada Lovelace" />
      <FormField
        id="email"
        label="Email"
        type="email"
        description="We only use this for account recovery."
        error="Enter a valid email address."
      />
    </div>
  );
}
