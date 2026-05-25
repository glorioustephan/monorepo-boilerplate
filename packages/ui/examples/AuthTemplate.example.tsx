import { AuthTemplate, SignInForm } from '@monorepo-boilerplate/ui';

/**
 * AuthTemplate centers a SignInForm in a full-screen layout.
 * This is the default single-column (no aside) variant.
 */
export default function AuthTemplateExample() {
  return (
    <AuthTemplate>
      <SignInForm />
    </AuthTemplate>
  );
}
