import { Button, Field, FormLayout, TextField } from '@monorepo-boilerplate/ui';

/**
 * FormLayout composes a two-column profile form with a Save/Cancel footer.
 * Demonstrates the `columns={2}` responsive grid and `footer` action slot.
 */
export default function FormLayoutExample() {
  return (
    <FormLayout
      title="Profile"
      description="Update your personal information."
      columns={2}
      footer={
        <>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </>
      }
    >
      <Field label="First name" htmlFor="first-name">
        <TextField.Root id="first-name" name="firstName" autoComplete="given-name" />
      </Field>

      <Field label="Last name" htmlFor="last-name">
        <TextField.Root id="last-name" name="lastName" autoComplete="family-name" />
      </Field>

      <Field label="Email" htmlFor="email">
        <TextField.Root type="email" id="email" name="email" autoComplete="email" />
      </Field>

      <Field label="Username" htmlFor="username">
        <TextField.Root id="username" name="username" autoComplete="username" />
      </Field>
    </FormLayout>
  );
}
