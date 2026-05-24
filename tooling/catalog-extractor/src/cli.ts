import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { buildRegistry, renderModule } from "./generate";

const OUTPUT = resolve("packages/ui/src/registry.generated.ts");

const metas = await buildRegistry();
writeFileSync(OUTPUT, renderModule(metas), "utf8");
process.stderr.write(`catalog: generated ${metas.length} components -> ${OUTPUT}\n`);
