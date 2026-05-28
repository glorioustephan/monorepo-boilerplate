import { Reasoning } from '@monorepo-boilerplate/ui';

const REASONING_TEXT = `I need to figure out the optimal route. First, I'll check the distance
between each city, then evaluate the trade-offs between speed and cost. The eastern corridor
looks more efficient given current traffic patterns.`;

/** Reasoning reveals AI chain-of-thought behind a collapsible trigger. */
export default function ReasoningExample() {
  return (
    <Reasoning>
      <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
      <Reasoning.Content>{REASONING_TEXT}</Reasoning.Content>
    </Reasoning>
  );
}
