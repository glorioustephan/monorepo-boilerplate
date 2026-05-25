import type { ReactNode } from 'react';

import { Box, Flex } from '../components';
import { cn } from '../lib/cn';

/** MarketingTemplateProps — slot-based props for the full-page marketing shell. */
export interface MarketingTemplateProps {
  /** Top navigation bar — typically a `<Navbar>`. */
  readonly navbar?: ReactNode;
  /** Page body — stack Hero, FeatureGrid, TestimonialSection, Cta, and other section blocks here. */
  readonly children: ReactNode;
  /** Bottom site footer — typically a `<FooterSection>`. */
  readonly footer?: ReactNode;
  readonly className?: string;
}

/**
 * MarketingTemplate — a full-page marketing shell with sticky-free navbar, scrollable body, and
 * footer pinned to the bottom of the viewport. Use as the outermost wrapper for landing pages,
 * product pages, and campaign pages.
 * Keywords: marketing, landing, page shell, layout, template, navbar, footer.
 */
export function MarketingTemplate({ navbar, children, footer, className }: MarketingTemplateProps) {
  return (
    <Flex direction="column" minHeight="100vh" className={cn(className)}>
      {navbar}
      <Box flexGrow="1">{children}</Box>
      {footer}
    </Flex>
  );
}
