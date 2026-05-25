import { GitHubLogoIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SignInFormExample from '../../examples/SignInForm.example';
import { Button } from '../components';
import { SignInForm } from './SignInForm';

const meta = {
  title: 'Recipes/SignInForm',
  component: SignInForm,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full sign-in card with Google + GitHub OAuth buttons and a sign-up footer link. */
export const Default: Story = {
  render: () => <SignInFormExample />,
};

/** Credentials only — no OAuth providers or footer link. */
export const NoOAuth: Story = {
  render: () => (
    <SignInForm
      title="Welcome back"
      submitLabel="Continue"
      forgotHref="/forgot-password"
      oauth={
        <Button variant="outline" style={{ width: '100%' }}>
          <GitHubLogoIcon style={{ marginRight: 8 }} />
          Continue with GitHub
        </Button>
      }
    />
  ),
};
