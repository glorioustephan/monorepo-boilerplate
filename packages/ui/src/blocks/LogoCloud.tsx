import type { ReactNode } from 'react';

import { Container, Flex, Link, Section, Text } from '../components';
import { cn } from '../lib/cn';

/** A single logo entry in the cloud. */
export interface LogoItem {
  /** Stable identifier for list keys. */
  readonly id: string;
  /** Logo slot — pass an `<img>`, inline SVG, or icon component from the caller. */
  readonly logo: ReactNode;
  /** Accessible label for the logo (used when no visible text is present). */
  readonly label?: string;
  /** Optional destination URL; wraps the logo in a `<Link>`. */
  readonly href?: string;
}

export interface LogoCloudProps {
  readonly logos: readonly LogoItem[];
  /** Optional muted title rendered above the logo strip. */
  readonly title?: ReactNode;
  readonly className?: string;
}

/**
 * LogoCloud — a responsive strip of customer or partner logos that establishes credibility.
 * Use for homepage social proof, integrations pages, or partner showcases (keywords: logos,
 * partners, customers, brands, trust bar, integrations, logo strip).
 */
export function LogoCloud({ logos, title, className }: LogoCloudProps) {
  return (
    <Section size="3" className={cn(className)}>
      <Container size="4">
        <Flex direction="column" gap="6" align="center">
          {title ? (
            <Text size="2" color="gray" align="center" weight="medium">
              {title}
            </Text>
          ) : undefined}
          <Flex wrap="wrap" justify="center" align="center" gap="6">
            {logos.map((item) =>
              item.href ? (
                <Link key={item.id} href={item.href} aria-label={item.label}>
                  {item.logo}
                </Link>
              ) : (
                <Flex key={item.id} align="center" aria-label={item.label}>
                  {item.logo}
                </Flex>
              ),
            )}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
