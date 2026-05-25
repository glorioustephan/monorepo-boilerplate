import type { ReactNode } from 'react';

import { Container, Flex, Heading, Section, Text } from '../components';

export interface HeroProps {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** Action slot, e.g. one or more `<Button>`s. */
  readonly actions?: ReactNode;
  readonly align?: 'center' | 'left';
}

/** Hero — a page-intro band: headline, supporting text, and an action slot. */
export function Hero({ title, description, actions, align = 'center' }: HeroProps) {
  const cross = align === 'center' ? 'center' : 'start';
  return (
    <Section size="4">
      <Container size="3">
        <Flex direction="column" align={cross} gap="4">
          <Heading as="h1" size="9" align={align}>
            {title}
          </Heading>
          {description ? (
            <Text size="4" color="gray" align={align}>
              {description}
            </Text>
          ) : undefined}
          {actions ? (
            <Flex gap="3" mt="2" wrap="wrap" justify={align === 'center' ? 'center' : 'start'}>
              {actions}
            </Flex>
          ) : undefined}
        </Flex>
      </Container>
    </Section>
  );
}
