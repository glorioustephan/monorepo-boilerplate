import { BarChartIcon, PersonIcon, ReaderIcon } from '@radix-ui/react-icons';

import { Grid, StatCard } from '@monorepo-boilerplate/ui';

/** StatCard renders a metric tile with a label, value, unit, trend badge, and optional icon. */
export default function StatCardExample() {
  return (
    <Grid columns={{ initial: '1', sm: '3' }} gap="3">
      <StatCard
        label="Total Subscribers"
        value="71,897"
        delta={{ value: '12%', trend: 'up' }}
        icon={<PersonIcon />}
      />
      <StatCard
        label="Avg. Open Rate"
        value="58.16"
        unit="%"
        delta={{ value: '2.02%', trend: 'up' }}
        icon={<ReaderIcon />}
      />
      <StatCard
        label="Avg. Click Rate"
        value="24.57"
        unit="%"
        delta={{ value: '4.05%', trend: 'down' }}
        icon={<BarChartIcon />}
      />
    </Grid>
  );
}
