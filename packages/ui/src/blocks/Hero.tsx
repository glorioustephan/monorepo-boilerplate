import type { ReactNode } from 'react';

import { Box, Container, Flex, Grid, Heading, Section, Text } from '../components';

export interface HeroProps {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** Action slot, e.g. one or more `<Button>`s. */
  readonly actions?: ReactNode;
  readonly align?: 'center' | 'left';
  /**
   * Visual layout variant.
   * - `'centered'` (default) — stacks content centrally, same as the original output.
   * - `'split'` — two-column grid with text on the left and `media` on the right.
   */
  readonly layout?: 'centered' | 'split';
  /**
   * Optional media node rendered in the right column when `layout === 'split'`.
   * Ignored when `layout === 'centered'`.
   */
  readonly media?: ReactNode;
}

/** Hero — a page-intro band: headline, supporting text, and an action slot. */
export function Hero({
  title,
  description,
  actions,
  align = 'center',
  layout = 'centered',
  media,
}: HeroProps) {
  if (layout === 'split' && media !== undefined) {
    return (
      <Section size="4">
        <Container size="3">
          <Grid columns={{ initial: '1', md: '2' }} gap="6" align="center">
            <Flex direction="column" align="start" gap="4">
              <Heading as="h1" size="9" align="left">
                {title}
              </Heading>
              {description ? (
                <Text size="4" color="gray" align="left">
                  {description}
                </Text>
              ) : undefined}
              {actions ? (
                <Flex gap="3" mt="2" wrap="wrap" justify="start">
                  {actions}
                </Flex>
              ) : undefined}
            </Flex>
            <Box>{media}</Box>
          </Grid>
        </Container>
      </Section>
    );
  }

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
