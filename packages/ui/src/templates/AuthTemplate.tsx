import type { ReactNode } from 'react';

import { Box, Flex, Grid } from '../components';
import { cn } from '../lib/cn';

export interface AuthTemplateProps {
  /** The auth form — e.g. a `<SignInForm>`. */
  readonly children: ReactNode;
  /** Optional right-column promo panel for a split-screen layout. Hidden on mobile. */
  readonly aside?: ReactNode;
  readonly className?: string;
}

/**
 * AuthTemplate — full-screen centered auth page; pass `aside` for a split-screen layout with a
 * promo panel on the right (visible from lg breakpoint). Use as the outermost wrapper for sign-in,
 * sign-up, and password-reset pages.
 * Keywords: auth, login, sign in, full screen, split screen, centered, page template.
 */
export function AuthTemplate({ children, aside, className }: AuthTemplateProps) {
  if (aside === undefined) {
    return (
      <Flex align="center" justify="center" p="4" minHeight="100vh" className={cn(className)}>
        <Box width="100%" maxWidth="28rem">
          {children}
        </Box>
      </Flex>
    );
  }

  return (
    <Grid columns={{ initial: '1', lg: '2' }} minHeight="100vh" className={cn(className)}>
      {/* Form column */}
      <Flex align="center" justify="center" p="4">
        <Box width="100%" maxWidth="28rem">
          {children}
        </Box>
      </Flex>

      {/* Aside column — hidden below the lg breakpoint */}
      <Box display={{ initial: 'none', lg: 'block' }}>{aside}</Box>
    </Grid>
  );
}
