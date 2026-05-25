import type { ReactNode } from 'react';

import { Box, Container, Flex, Grid, Heading, Link, Section, Separator } from '../components';
import { cn } from '../lib/cn';
import type { NavLink } from '../types';

/** A titled group of links rendered as a column inside `FooterSection`. */
export interface FooterGroup {
  /** Column heading. */
  readonly title: ReactNode;
  /** Links listed beneath the heading. */
  readonly links: readonly NavLink[];
}

export interface FooterSectionProps {
  /** Link group columns. */
  readonly groups: readonly FooterGroup[];
  /** Brand slot rendered in the first column — logo, wordmark, or tagline. */
  readonly brand?: ReactNode;
  /** Bottom row rendered below a `Separator` — copyright text, social icons, etc. */
  readonly bottom?: ReactNode;
  /** Extra class names merged onto the root `<footer>`. */
  readonly className?: string;
}

/**
 * FooterSection — a multi-column site footer with a brand slot, grouped link columns, and an
 * optional bottom bar. Use for marketing pages, app shells, and documentation sites
 * (footer, sitemap, navigation, social links).
 */
export function FooterSection({ groups, brand, bottom, className }: FooterSectionProps) {
  return (
    <Box asChild>
      <footer className={cn(className)}>
        <Container size="4">
          <Section size="3">
            <Grid columns={{ initial: '1', md: '4' }} gap="8">
              {/* Brand column */}
              {brand ? <Box>{brand}</Box> : undefined}

              {/* Link group columns — span remaining space */}
              <Grid
                columns={{ initial: '2', md: String(groups.length) as '1' | '2' | '3' | '4' }}
                gap="8"
                gridColumn={brand ? { md: 'span 3' } : undefined}
              >
                {groups.map((group, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list; no stable id available
                  <Flex key={i} direction="column" gap="3">
                    <Heading as="h3" size="2">
                      {group.title}
                    </Heading>
                    <Flex direction="column" gap="2">
                      {group.links.map((link) => (
                        <Link key={link.href} href={link.href} size="2" color="gray">
                          {link.label}
                        </Link>
                      ))}
                    </Flex>
                  </Flex>
                ))}
              </Grid>
            </Grid>

            {bottom ? (
              <>
                <Separator size="4" my="6" />
                {bottom}
              </>
            ) : undefined}
          </Section>
        </Container>
      </footer>
    </Box>
  );
}
