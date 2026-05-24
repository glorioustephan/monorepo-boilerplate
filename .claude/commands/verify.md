---
description: Run the full verification suite (lint, typecheck, test, build)
---

Run the repository's verification gates in order and report any failures with the
relevant output. Stop and surface the first failure clearly.

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

If `format:check` fails, run `pnpm format` to fix, then continue. Summarize the
final result (which gates passed, which failed) at the end.
