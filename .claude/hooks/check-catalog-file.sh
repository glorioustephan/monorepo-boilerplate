#!/usr/bin/env bash
# PostToolUse hook: warn (advisory, non-blocking) if the app file the agent just
# edited bypasses the component catalog — a raw <button>/<input>/<select> where a
# kit component exists, or a direct import of a styling primitive the kit wraps.
# Only app source is checked. Always exits 0 — enforcement happens in lefthook/CI
# via `pnpm lint:catalog`.
set -euo pipefail

input="$(cat)"
file="$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&j.tool_input.file_path)||"")}catch{}})')"

case "$file" in
  *apps/*.ts | *apps/*.tsx)
    if [ -f "$file" ]; then
      pnpm exec tsx tooling/catalog-lint/src/check-catalog.ts "$file" 1>&2 || true
    fi
    ;;
esac

exit 0
