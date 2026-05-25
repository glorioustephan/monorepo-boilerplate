'use client';

import type { ReactNode } from 'react';

import { Button, Container, Flex, Heading, Section, Text, TextField } from '../components';
import { cn } from '../lib/cn';

/** NewsletterSectionProps — props for the email-capture band. */
export interface NewsletterSectionProps {
  /** Section headline. */
  readonly title?: ReactNode;
  /** Supporting copy shown below the headline. */
  readonly description?: ReactNode;
  /** Called when the user submits the form. */
  readonly onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Placeholder for the email input. Defaults to `'Enter your email'`. */
  readonly placeholder?: string;
  /** Label for the submit button. Defaults to `'Subscribe'`. */
  readonly submitLabel?: ReactNode;
  readonly className?: string;
}

/**
 * NewsletterSection — an email-capture band with a headline, supporting copy, and an inline
 * subscribe form. Use for marketing pages, landing pages, or footers where you want to grow
 * an email list. Keywords: newsletter, email, subscribe, capture, marketing, signup.
 */
export function NewsletterSection({
  title,
  description,
  onSubmit,
  placeholder = 'Enter your email',
  submitLabel = 'Subscribe',
  className,
}: NewsletterSectionProps) {
  return (
    <Section size="3" className={cn(className)}>
      <Container size="2">
        <Flex direction="column" align="center" gap="5">
          {title !== undefined && (
            <Heading as="h2" size="6" align="center">
              {title}
            </Heading>
          )}
          {description !== undefined && (
            <Text size="3" color="gray" align="center">
              {description}
            </Text>
          )}
          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Flex gap="3" align="center" wrap="wrap" justify="center">
              <TextField.Root
                type="email"
                placeholder={placeholder}
                required
                size="3"
                style={{ flexGrow: 1, minWidth: '200px', maxWidth: '360px' }}
                aria-label="Email address"
              />
              <Button type="submit" size="3">
                {submitLabel}
              </Button>
            </Flex>
          </form>
        </Flex>
      </Container>
    </Section>
  );
}
