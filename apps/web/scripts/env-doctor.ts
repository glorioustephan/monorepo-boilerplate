import { checkEnv, printDoctorReport } from '@monorepo-boilerplate/environment';

import { clientSchema, serverSchema } from '../src/env.schema';

// Same schema as src/env.ts (imported, not duplicated). `checkEnv` validates
// every key and reports each one, rather than throwing on the first failure.
const ok = printDoctorReport(checkEnv({ ...serverSchema, ...clientSchema }));
process.exit(ok ? 0 : 1);
