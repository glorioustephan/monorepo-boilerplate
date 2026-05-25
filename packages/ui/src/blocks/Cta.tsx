import type { ReactNode } from "react";

import { Card, Container, Flex, Heading, Section, Text } from "../components";

export interface CtaProps {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** Action slot, e.g. one or more `<Button>`s. */
  readonly actions?: ReactNode;
}

/** Cta — a closing call-to-action panel centered on a surface card. */
export function Cta({ title, description, actions }: CtaProps) {
  return (
    <Section size="3">
      <Container size="3">
        <Card size="4">
          <Flex direction="column" align="center" gap="3">
            <Heading as="h2" size="6" align="center">
              {title}
            </Heading>
            {description ? (
              <Text color="gray" align="center">
                {description}
              </Text>
            ) : undefined}
            {actions ? (
              <Flex gap="3" mt="2" wrap="wrap" justify="center">
                {actions}
              </Flex>
            ) : undefined}
          </Flex>
        </Card>
      </Container>
    </Section>
  );
}
