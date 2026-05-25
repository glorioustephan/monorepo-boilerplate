import { Field, TextField } from "@monorepo-boilerplate/ui";

/** Field labels a control and wires its description + accessibility attributes. */
export default function FieldExample() {
  return (
    <Field label="Email" htmlFor="email" description="We'll never share it." required>
      <TextField.Root type="email" placeholder="you@example.com" />
    </Field>
  );
}
