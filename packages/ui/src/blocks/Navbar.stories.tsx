import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from '../components';
import NavbarExample from '../../examples/Navbar.example';
import { Navbar } from './Navbar';

const meta = {
  title: 'Blocks/Navbar',
  component: Navbar,
  args: {
    brand: <Heading size="4">Acme</Heading>,
    links: [{ label: 'Home', href: '/' }],
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NavbarExample />,
};

export const MinimalNoActions: Story = {
  render: () => (
    <Navbar
      brand={<Heading size="4">Minimal</Heading>}
      links={[
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]}
      menuIcon={<HamburgerMenuIcon />}
    />
  ),
};
