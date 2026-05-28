import { Flex, Tool } from '@monorepo-boilerplate/ui';

/** Tool renders inline AI tool-call cards for each lifecycle state. */
export default function ToolExample() {
  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 480 }}>
      <Tool
        toolPart={{
          type: 'search_web',
          state: 'input-streaming',
          input: { query: 'best pizza in Rome' },
        }}
      />
      <Tool
        toolPart={{
          type: 'search_web',
          state: 'input-available',
          input: { query: 'best pizza in Rome' },
        }}
      />
      <Tool
        defaultOpen
        toolPart={{
          type: 'search_web',
          state: 'output-available',
          input: { query: 'best pizza in Rome' },
          output: { results: ['Pizzarium', 'Il Sorpasso'], total: 2 },
          toolCallId: 'call_abc123',
        }}
      />
      <Tool
        toolPart={{
          type: 'search_web',
          state: 'output-error',
          input: { query: 'best pizza in Rome' },
          errorText: 'Network timeout — please retry.',
          toolCallId: 'call_abc456',
        }}
      />
    </Flex>
  );
}
