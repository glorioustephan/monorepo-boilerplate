import { CheckCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AlertExample from '../../examples/Alert.example';
import { Alert } from './Alert';

const meta = {
  title: 'Recipes/Alert',
  component: Alert,
  args: { children: 'This is an alert message.' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AlertExample />,
};

export const Info: Story = {
  render: () => (
    <Alert color="blue" icon={<InfoCircledIcon />} title="Heads up">
      This feature is currently in beta and may change without notice.
    </Alert>
  ),
};

export const ErrorWithDismiss: Story = {
  render: () => (
    <Alert color="red" title="Something went wrong" onDismiss={() => undefined}>
      We could not process your request. Please try again later.
    </Alert>
  ),
};

export const SingleLineDismiss: Story = {
  render: () => (
    <Alert color="green" icon={<CheckCircledIcon />} onDismiss={() => undefined}>
      Successfully uploaded.
    </Alert>
  ),
};
