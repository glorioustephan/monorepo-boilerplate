import { Steps } from '@monorepo-boilerplate/ui';
import { GearIcon } from '@radix-ui/react-icons';

/** Steps shows a collapsible step-by-step plan with a vertical bar layout. */
export default function StepsExample() {
  return (
    <Steps>
      <Steps.Trigger leftIcon={<GearIcon />}>Execution plan</Steps.Trigger>
      <Steps.Content>
        <Steps.Item>Search the web for recent papers on the topic.</Steps.Item>
        <Steps.Item>Summarise the top 5 results.</Steps.Item>
        <Steps.Item>Draft a concise answer with citations.</Steps.Item>
      </Steps.Content>
    </Steps>
  );
}
