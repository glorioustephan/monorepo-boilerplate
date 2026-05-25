import type { Meta, StoryObj } from '@storybook/react-vite';

import LandingTemplateExample from '../../examples/LandingTemplate.example';
import { LandingTemplate } from './LandingTemplate';

const meta = {
  title: 'Templates/LandingTemplate',
  component: LandingTemplate,
  args: { title: 'Landing', features: [], cta: { title: 'Ready?' } },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LandingTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LandingTemplateExample />,
};
