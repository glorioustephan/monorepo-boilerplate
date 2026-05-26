import { CheckCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AlertExample from '../../examples/Alert.example';
import { Alert } from './Alert';

const meta = {
  title: 'Recipes/Alert',
  component: Alert,
  args: {
    children: 'This is an alert message.',
    title: 'Alert title',
    color: 'blue',
    variant: 'soft',
    onDismiss: () => {},
    dismissLabel: 'Dismiss',
  },
  render: (args) => <Alert {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/children/color/variant/onDismiss in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <AlertExample />,
};

export const Info: Story = {
  args: {
    color: 'blue',
    title: 'Heads up',
    children: 'This feature is currently in beta and may change without notice.',
    icon: <InfoCircledIcon />,
    onDismiss: undefined,
  },
};

export const ErrorWithDismiss: Story = {
  args: {
    color: 'red',
    title: 'Something went wrong',
    children: 'We could not process your request. Please try again later.',
    onDismiss: () => {},
  },
};

export const SingleLineDismiss: Story = {
  args: {
    color: 'green',
    title: undefined,
    children: 'Successfully uploaded.',
    icon: <CheckCircledIcon />,
    onDismiss: () => {},
  },
};
