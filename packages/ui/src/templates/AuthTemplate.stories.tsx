import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthTemplateExample from '../../examples/AuthTemplate.example';
import { Box, Flex, Heading, Text } from '../components';
import { SignInForm } from '../recipes/SignInForm';
import { AuthTemplate } from './AuthTemplate';

const meta = {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
  args: { children: <SignInForm /> },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AuthTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single-column centered layout — the default for most auth pages. */
export const Default: Story = {
  render: () => <AuthTemplateExample />,
};

/** Split-screen layout: form on the left, promo panel on the right (lg+). */
export const SplitScreen: Story = {
  render: () => (
    <AuthTemplate
      aside={
        <Flex
          align="center"
          justify="center"
          direction="column"
          gap="3"
          p="8"
          style={{ height: '100%', background: 'var(--accent-9)' }}
        >
          <Heading as="h2" size="7" style={{ color: 'var(--accent-1)' }}>
            Build faster.
          </Heading>
          <Box style={{ maxWidth: 360 }}>
            <Text size="3" align="center" style={{ color: 'var(--accent-2)' }}>
              A themeable design system, agent-ready tooling, and end-to-end type safety —
              everything you need to ship with confidence.
            </Text>
          </Box>
        </Flex>
      }
    >
      <SignInForm />
    </AuthTemplate>
  ),
};
