import type { Meta, StoryObj } from '@storybook/react-vite';

import ContactSectionExample from '../../examples/ContactSection.example';
import { ContactSection } from './ContactSection';

const meta = {
  title: 'Blocks/ContactSection',
  component: ContactSection,
  args: {
    title: 'Get in touch',
    description:
      "We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.",
    submitLabel: 'Send message',
    onSubmit: () => {},
  },
  render: (args) => <ContactSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContactSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, and submitLabel in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing an aside info panel (catalog example). */
export const Example: Story = {
  render: () => <ContactSectionExample />,
};

export const Centered: Story = {
  args: {
    title: 'Contact us',
    description: 'Fill out the form and our team will be in touch.',
    submitLabel: 'Send message',
    aside: undefined,
  },
};
