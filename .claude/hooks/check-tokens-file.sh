#!/usr/bin/env bash
# PostToolUse hook: warn (advisory, non-blocking) if the file the agent just
# edited bypasses the semantic token contract (arbitrary/raw colors in classes).
# Always exits 0 — enforcement happens in lefthook/CI via `pnpm lint:tokens`.
set -euo pipefail

input="$(cat)"
file="$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&j.tool_input.file_path)||"")}catch{}})')"

case "$file" in
  *.ts | *.tsx)
    if [ -f "$file" ]; then
      pnpm exec tsx tooling/catalog-lint/src/check-tokens.ts "$file" 1>&2 || true
    fi
    ;;
esac

exit 0
