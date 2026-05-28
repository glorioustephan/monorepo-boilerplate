import { FeedbackBar } from '@monorepo-boilerplate/ui';

/** FeedbackBar demonstrates a feedback bar with a title and all three handlers wired. */
export default function FeedbackBarExample() {
  return (
    <FeedbackBar
      title="Was this response helpful?"
      onHelpful={() => undefined}
      onNotHelpful={() => undefined}
      onClose={() => undefined}
    />
  );
}
