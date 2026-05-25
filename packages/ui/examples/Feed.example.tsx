import { CheckCircledIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';

import { Box, Feed } from '@monorepo-boilerplate/ui';

/** Feed renders a vertical activity timeline with icons and relative timestamps. */
export default function FeedExample() {
  return (
    <Box style={{ maxWidth: '36rem' }}>
      <Feed
        items={[
          {
            id: 'applied',
            icon: <PersonIcon width={18} height={18} />,
            content: 'Applied to Senior Frontend Engineer at Acme Corp.',
            timestamp: '3 days ago',
          },
          {
            id: 'screening',
            icon: <ClockIcon width={18} height={18} />,
            content: 'Advanced to phone screening — interview scheduled for Monday.',
            timestamp: '2 days ago',
          },
          {
            id: 'interview',
            icon: <CheckCircledIcon width={18} height={18} />,
            content: 'Completed technical interview with the engineering team.',
            timestamp: '1 hour ago',
          },
        ]}
      />
    </Box>
  );
}
