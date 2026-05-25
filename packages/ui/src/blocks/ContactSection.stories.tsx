import type { Meta, StoryObj } from '@storybook/react-vite';

import ContactSectionExample from '../../examples/ContactSection.example';
import { ContactSection } from './ContactSection';

const meta = {
  title: 'Blocks/ContactSection',
  component: ContactSection,
  args: {},
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContactSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ContactSectionExample />,
};

export const Centered: Story = {
  render: () => (
    <ContactSection
      title="Contact us"
      description="Fill out the form and our team will be in touch."
      submitLabel="Send message"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    />
  ),
};
