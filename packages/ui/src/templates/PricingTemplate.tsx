import type { ReactNode } from 'react';

import { Box, Container, Flex, Heading, Section, Text } from '../components';
import { cn } from '../lib/cn';

/** PricingTemplateProps — slot-based props for the full-page pricing layout. */
export interface PricingTemplateProps {
  /** Top navigation bar — typically a `<Navbar>`. */
  readonly navbar?: ReactNode;
  /** Optional page heading displayed above the pricing section. */
  readonly title?: ReactNode;
  /** Optional supporting description rendered below the title. */
  readonly description?: ReactNode;
  /** The pricing grid — typically a `<PricingSection>`. */
  readonly pricing: ReactNode;
  /** Optional FAQ block rendered below pricing — typically a `<FaqSection>`. */
  readonly faq?: ReactNode;
  /** Optional call-to-action block rendered below the FAQ — typically a `<Cta>`. */
  readonly cta?: ReactNode;
  /** Bottom site footer — typically a `<FooterSection>`. */
  readonly footer?: ReactNode;
  readonly className?: string;
}

/**
 * PricingTemplate — a full-page pricing layout scaffold with an optional intro heading,
 * a pricing section slot, an optional FAQ block, and an optional closing CTA. Use as the
 * outermost wrapper for SaaS pricing pages, plan-selection screens, and upgrade flows.
 * Keywords: pricing, plans, billing, subscription, template, page shell, layout.
 */
export function PricingTemplate({
  navbar,
  title,
  description,
  pricing,
  faq,
  cta,
  footer,
  className,
}: PricingTemplateProps) {
  const hasIntro = title !== undefined || description !== undefined;

  return (
    <Flex direction="column" minHeight="100vh" className={cn(className)}>
      {navbar}
      <Box flexGrow="1">
        {hasIntro && (
          <Section size="3">
            <Container size="3">
              <Flex direction="column" align="center" gap="3">
                {title !== undefined && (
                  <Heading as="h1" size="8" align="center">
                    {title}
                  </Heading>
                )}
                {description !== undefined && (
                  <Text size="4" color="gray" align="center">
                    {description}
                  </Text>
                )}
              </Flex>
            </Container>
          </Section>
        )}
        {pricing}
        {faq}
        {cta}
      </Box>
      {footer}
    </Flex>
  );
}
