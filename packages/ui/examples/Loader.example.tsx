'use client';

import { Flex, type LoaderVariant, Loader, Text } from '@monorepo-boilerplate/ui';

const VARIANTS: LoaderVariant[] = [
  'circular',
  'classic',
  'dots',
  'typing',
  'wave',
  'bars',
  'terminal',
  'text-blink',
  'text-shimmer',
  'loading-dots',
];

/**
 * Loader shows all ten animation variants in a grid for light/dark comparison.
 */
export default function LoaderExample() {
  return (
    <Flex wrap="wrap" gap="6" p="4">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" align="center" gap="2" style={{ minWidth: 100 }}>
          <Loader variant={variant} />
          <Text size="1" color="gray">
            {variant}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
