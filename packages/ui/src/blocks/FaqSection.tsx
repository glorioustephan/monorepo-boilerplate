import type { ReactNode } from 'react';

import { Box, Container, Flex, Heading, Section, Separator, Text } from '../components';
import { cn } from '../lib/cn';
import { Collapsible } from '../recipes';

/** A single FAQ entry. */
export interface FaqItem {
  /** Stable identifier for list keys. */
  readonly id: string;
  /** The question text or rich content. */
  readonly question: ReactNode;
  /** The answer text or rich content. */
  readonly answer: ReactNode;
}

export interface FaqSectionProps {
  /** Ordered list of FAQ entries rendered as an accordion. */
  readonly items: readonly FaqItem[];
  /** Optional section heading rendered above the accordion. */
  readonly title?: ReactNode;
  /** Optional supporting text rendered below the title. */
  readonly description?: ReactNode;
  readonly className?: string;
}

/**
 * FaqSection — an accordion of frequently-asked questions in a centered marketing section.
 * Use for product FAQ pages, help center previews, onboarding explainers, and pricing-page
 * clarifications (keywords: faq, accordion, questions, answers, help, support).
 */
export function FaqSection({ items, title, description, className }: FaqSectionProps) {
  return (
    <Section size="4" className={cn(className)}>
      <Container size="3">
        <Flex direction="column" gap="6">
          {(title ?? description) ? (
            <Flex direction="column" align="center" gap="3">
              {title ? (
                <Heading as="h2" size="7" align="center">
                  {title}
                </Heading>
              ) : undefined}
              {description ? (
                <Text color="gray" size="3" align="center">
                  {description}
                </Text>
              ) : undefined}
            </Flex>
          ) : undefined}
          <Flex direction="column">
            {items.map((item, index) => (
              <Flex key={item.id} direction="column">
                {index > 0 ? <Separator size="4" /> : undefined}
                <Collapsible
                  trigger={({ open }) => (
                    <Flex align="center" justify="between" gap="4" py="3" width="100%">
                      <Text weight="medium" size="3">
                        {item.question}
                      </Text>
                      <Text
                        aria-hidden
                        style={{
                          transform: open ? 'rotate(180deg)' : undefined,
                          transition: 'transform 200ms',
                        }}
                      >
                        ▾
                      </Text>
                    </Flex>
                  )}
                >
                  <Box pb="3">
                    <Text as="p" color="gray" size="2">
                      {item.answer}
                    </Text>
                  </Box>
                </Collapsible>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
