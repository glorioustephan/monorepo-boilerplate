'use client';

import type { ReactNode } from 'react';

import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  TextArea,
  TextField,
} from '../components';
import { cn } from '../lib/cn';
import { Field } from '../recipes';

/** ContactSectionProps — props for the contact form section. */
export interface ContactSectionProps {
  /** Section headline. */
  readonly title?: ReactNode;
  /** Supporting copy shown below the headline. */
  readonly description?: ReactNode;
  /** Called when the user submits the form. */
  readonly onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /**
   * Optional left info column for a side-by-side layout. When provided, the section renders a
   * two-column grid: aside on the left, the form on the right.
   */
  readonly aside?: ReactNode;
  /** Label for the submit button. Defaults to `'Send message'`. */
  readonly submitLabel?: ReactNode;
  readonly className?: string;
}

/**
 * ContactSection — a contact form section with name, email, and message fields. When an `aside`
 * is provided the layout switches to two columns: info panel left, form right. Use for contact
 * pages, support pages, or lead-generation forms.
 * Keywords: contact, form, message, email, side-by-side, marketing, support, lead.
 */
export function ContactSection({
  title,
  description,
  onSubmit,
  aside,
  submitLabel = 'Send message',
  className,
}: ContactSectionProps) {
  const header =
    title !== undefined || description !== undefined ? (
      <Flex direction="column" gap="2" mb="5">
        {title !== undefined && (
          <Heading as="h2" size="6">
            {title}
          </Heading>
        )}
        {description !== undefined && (
          <Heading as="h3" size="3" weight="regular" color="gray">
            {description}
          </Heading>
        )}
      </Flex>
    ) : undefined;

  const form = (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="4">
        <Field label="Name" htmlFor="contact-name" required>
          <TextField.Root
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
        </Field>
        <Field label="Email" htmlFor="contact-email" required>
          <TextField.Root
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field label="Message" htmlFor="contact-message" required>
          <TextArea
            id="contact-message"
            name="message"
            placeholder="Tell us how we can help…"
            rows={5}
            required
          />
        </Field>
        <Flex justify="end" mt="2">
          <Button type="submit" size="3">
            {submitLabel}
          </Button>
        </Flex>
      </Flex>
    </form>
  );

  return (
    <Section size="3" className={cn(className)}>
      <Container size="3">
        {aside !== undefined ? (
          <>
            {header}
            <Grid columns={{ initial: '1', md: '2' }} gap="8">
              <div>{aside}</div>
              <div>{form}</div>
            </Grid>
          </>
        ) : (
          <>
            {header}
            {form}
          </>
        )}
      </Container>
    </Section>
  );
}
