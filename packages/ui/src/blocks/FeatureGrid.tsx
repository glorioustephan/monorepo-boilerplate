import { Card, Container, Flex, Grid, type GridProps, Heading, Section, Text } from '../components';

export interface Feature {
  readonly title: string;
  readonly description: string;
  /** Stable key; falls back to `title` when omitted. */
  readonly id?: string;
}

export interface FeatureGridProps {
  readonly features: readonly Feature[];
  /** Responsive column count (defaults to 1 → 2 → 3 across breakpoints). */
  readonly columns?: GridProps['columns'];
}

// Stable reference so the default prop doesn't break referential equality per render.
const DEFAULT_COLUMNS: GridProps['columns'] = { initial: '1', sm: '2', md: '3' };

/** FeatureGrid — a responsive grid of feature cards. */
export function FeatureGrid({ features, columns = DEFAULT_COLUMNS }: FeatureGridProps) {
  return (
    <Section size="3">
      <Container size="4">
        <Grid columns={columns} gap="4">
          {features.map((feature) => (
            <Card key={feature.id ?? feature.title} size="2">
              <Flex direction="column" gap="1">
                <Heading as="h3" size="3">
                  {feature.title}
                </Heading>
                <Text size="2" color="gray">
                  {feature.description}
                </Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
