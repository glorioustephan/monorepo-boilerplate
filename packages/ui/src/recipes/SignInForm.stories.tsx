import { GitHubLogoIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SignInFormExample from '../../examples/SignInForm.example';
import { Button } from '../components';
import { SignInForm } from './SignInForm';

const meta = {
  title: 'Recipes/SignInForm',
  component: SignInForm,
  args: { title: 'Sign in to your account', submitLabel: 'Sign in', forgotHref: '#' },
  render: (args) => <SignInForm {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/submitLabel/forgotHref in Controls (no OAuth slot). */
export const Default: Story = {};

/** Reference example: full card with Google + GitHub OAuth buttons and a sign-up footer link. */
export const Example: Story = {
  render: () => <SignInFormExample />,
};

/** Credentials + a single OAuth provider, custom labels. */
export const SingleProvider: Story = {
  args: {
    title: 'Welcome back',
    submitLabel: 'Continue',
    forgotHref: '/forgot-password',
    oauth: (
      <Button variant="outline" style={{ width: '100%' }}>
        <GitHubLogoIcon style={{ marginRight: 8 }} />
        Continue with GitHub
      </Button>
    ),
  },
};
