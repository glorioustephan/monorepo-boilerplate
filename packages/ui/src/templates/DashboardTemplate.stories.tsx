import type { Meta, StoryObj } from '@storybook/react-vite';

import DashboardTemplateExample from '../../examples/DashboardTemplate.example';
import { Box, Flex, Text } from '../components';
import { SidebarNav } from '../blocks/SidebarNav';
import { DashboardTemplate } from './DashboardTemplate';

const meta = {
  title: 'Templates/DashboardTemplate',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full app shell: sidebar + navbar + stat cards + data table. */
export const Default: Story = {
  render: () => <DashboardTemplateExample />,
};

/** Minimal variant — sidebar only, no header, plain content. */
export const NoHeader: Story = {
  render: () => (
    <DashboardTemplate
      sidebar={
        <SidebarNav
          header={
            <Flex px="3" py="3">
              <Text size="3" weight="bold">
                Monorepo
              </Text>
            </Flex>
          }
          sections={[
            {
              items: [
                { label: 'Overview', href: '/overview', active: true },
                { label: 'Settings', href: '/settings' },
              ],
            },
          ]}
        />
      }
    >
      <Box p="4">
        <Text>Main content area (no header).</Text>
      </Box>
    </DashboardTemplate>
  ),
};
