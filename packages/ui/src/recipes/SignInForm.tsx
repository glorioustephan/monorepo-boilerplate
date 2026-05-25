'use client';

import type { ReactNode } from 'react';

import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
  TextField,
} from '../components';
import { cn } from '../lib/cn';
import { Field } from './Field';

export interface SignInFormProps {
  /** Called when the form is submitted. */
  readonly onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Card heading. Defaults to "Sign in to your account". */
  readonly title?: ReactNode;
  /** Logo slot rendered above the heading. */
  readonly logo?: ReactNode;
  /** OAuth provider button slot rendered below the email/password fields. */
  readonly oauth?: ReactNode;
  /** Footer slot for secondary links, e.g. "Not a member? Sign up". */
  readonly footer?: ReactNode;
  /** href for the "Forgot password?" link. */
  readonly forgotHref?: string;
  /** Submit button label. Defaults to "Sign in". */
  readonly submitLabel?: ReactNode;
  readonly className?: string;
}

/**
 * SignInForm — a self-contained email + password sign-in card with optional OAuth slot and footer.
 * Use for authentication pages; compose inside `AuthTemplate` for a full-page layout.
 * Keywords: login, sign in, auth, email, password, oauth, credentials.
 */
export function SignInForm({
  onSubmit,
  title = 'Sign in to your account',
  logo,
  oauth,
  footer,
  forgotHref = '#',
  submitLabel = 'Sign in',
  className,
}: SignInFormProps) {
  return (
    <Box width="100%" maxWidth="28rem" className={cn(className)}>
      <Card size="4">
        <Flex direction="column" gap="5">
          {/* Logo + heading */}
          {logo !== undefined && (
            <Flex justify="center" mb="1">
              {logo}
            </Flex>
          )}
          <Heading as="h1" size="6" align="center">
            {title}
          </Heading>

          {/* Credentials */}
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="4">
              <Field label="Email" htmlFor="email">
                <TextField.Root
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </Field>

              <Field label="Password" htmlFor="password">
                <TextField.Root
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
              </Field>

              {/* Remember me + forgot password */}
              <Flex justify="between" align="center">
                <Text as="label" size="2">
                  <Flex gap="2" align="center">
                    <Checkbox name="remember" />
                    Remember me
                  </Flex>
                </Text>
                <Link href={forgotHref} size="2">
                  Forgot password?
                </Link>
              </Flex>

              <Button type="submit" style={{ width: '100%' }}>
                {submitLabel}
              </Button>
            </Flex>
          </form>

          {/* OAuth divider + slot */}
          {oauth !== undefined && (
            <Flex direction="column" gap="4">
              <Flex align="center" gap="3">
                <Separator style={{ flex: 1 }} />
                <Text size="1" color="gray">
                  Or continue with
                </Text>
                <Separator style={{ flex: 1 }} />
              </Flex>
              {oauth}
            </Flex>
          )}

          {/* Footer */}
          {footer !== undefined && (
            <Text size="2" align="center">
              {footer}
            </Text>
          )}
        </Flex>
      </Card>
    </Box>
  );
}
