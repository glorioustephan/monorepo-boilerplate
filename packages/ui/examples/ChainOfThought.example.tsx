import { ChainOfThought } from '@monorepo-boilerplate/ui';

/** ChainOfThought shows a vertical chain of collapsible reasoning steps. */
export default function ChainOfThoughtExample() {
  return (
    <ChainOfThought>
      <ChainOfThought.Step>
        <ChainOfThought.Trigger>Search the web</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>Queried 3 sources for recent data.</ChainOfThought.Item>
          <ChainOfThought.Item>Found 12 relevant results.</ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>

      <ChainOfThought.Step>
        <ChainOfThought.Trigger>Analyse results</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>Filtered duplicates and low-quality sources.</ChainOfThought.Item>
          <ChainOfThought.Item>Ranked by recency and relevance.</ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>

      <ChainOfThought.Step defaultOpen>
        <ChainOfThought.Trigger>Draft answer</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Item>
            Compiled key findings into a concise summary with citations.
          </ChainOfThought.Item>
        </ChainOfThought.Content>
      </ChainOfThought.Step>
    </ChainOfThought>
  );
}
