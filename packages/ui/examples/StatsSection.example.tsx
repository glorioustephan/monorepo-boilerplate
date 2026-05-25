import { StatsSection } from '@monorepo-boilerplate/ui';

/** StatsSection showing three headline metrics for a marketing page. */
export default function StatsSectionExample() {
  return (
    <StatsSection
      title="Trusted by teams worldwide"
      description="Numbers that reflect the real-world adoption of the boilerplate."
      stats={[
        { label: 'Active customers', value: '8,000', unit: '+' },
        { label: 'Uptime', value: '99.9', unit: '%' },
        { label: 'Countries', value: '40', unit: '+' },
      ]}
    />
  );
}
