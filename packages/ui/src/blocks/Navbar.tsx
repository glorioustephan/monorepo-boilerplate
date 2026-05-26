import type { ReactNode } from 'react';

import { Box, Container, Flex, Link } from '../components';
import { cn } from '../lib/cn';
import { Collapsible } from '../recipes';
import type { NavLink } from '../types';

export interface NavbarProps {
  /** Brand slot — logo, wordmark, or any `ReactNode`. */
  readonly brand: ReactNode;
  /** Primary navigation links. Active link receives `weight="medium"` + `highContrast`. */
  readonly links: readonly NavLink[];
  /** Right-side slot: profile menu, notifications, etc. Hidden on mobile. */
  readonly actions?: ReactNode;
  /** Hamburger glyph passed through to `NavbarMobileMenu`. Defaults to the text "Menu". */
  readonly menuIcon?: ReactNode;
  /** Extra class names merged onto the root `<header>`. */
  readonly className?: string;
}

export interface NavbarMobileMenuProps {
  /** Navigation links rendered inside the collapsible panel. */
  readonly links: readonly NavLink[];
  /** Trigger content for the toggle button. */
  readonly icon?: ReactNode;
}

/**
 * NavbarMobileMenu — collapsible mobile navigation panel.
 * Use for the mobile breakpoint inside `Navbar`. Renders a `Collapsible` with a
 * vertical list of nav links (hamburger, disclosure, navigation).
 */
export function NavbarMobileMenu({ links, icon }: NavbarMobileMenuProps) {
  return (
    <Box display={{ initial: 'block', sm: 'none' }}>
      <Collapsible trigger={icon ?? 'Menu'}>
        <Flex direction="column" gap="1" py="2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              weight={link.active ? 'medium' : 'regular'}
              highContrast={link.active}
              size="3"
            >
              {link.label}
            </Link>
          ))}
        </Flex>
      </Collapsible>
    </Box>
  );
}

/**
 * Navbar — top-of-page navigation bar with a brand slot, desktop link row, and a collapsible
 * mobile menu. Use for app shells, marketing sites, and dashboards (navigation, header, topbar).
 * Pass `actions` for auth/profile controls and `menuIcon` for a custom hamburger glyph.
 */
export function Navbar({ brand, links, actions, menuIcon, className }: NavbarProps) {
  return (
    <Box asChild>
      <header className={cn(className)}>
        <Container size="4">
          <Flex align="center" justify="between" height="64px">
            {/* Left: brand + desktop nav */}
            <Flex align="center" gap="6">
              {brand}
              <Flex asChild gap="5" display={{ initial: 'none', sm: 'flex' }}>
                <nav aria-label="Primary">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      weight={link.active ? 'medium' : 'regular'}
                      highContrast={link.active}
                      size="2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </Flex>
            </Flex>

            {/* Right: actions (desktop) + mobile toggle */}
            <Flex align="center" gap="3">
              {actions ? (
                <Flex align="center" gap="3" display={{ initial: 'none', sm: 'flex' }}>
                  {actions}
                </Flex>
              ) : undefined}
              <NavbarMobileMenu links={links} icon={menuIcon} />
            </Flex>
          </Flex>
        </Container>
      </header>
    </Box>
  );
}
