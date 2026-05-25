import { Badge, Code, DataList, Flex } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Data Display/DataList',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataList.Root>
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">Status</DataList.Label>
        <DataList.Value>
          <Badge color="jade" variant="soft" radius="full">
            Authorized
          </Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">ID</DataList.Label>
        <DataList.Value>
          <Flex align="center" gap="2">
            <Code variant="ghost">u_2J89JSA4GJ</Code>
          </Flex>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Name</DataList.Label>
        <DataList.Value>Vlad Moroz</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  ),
};
