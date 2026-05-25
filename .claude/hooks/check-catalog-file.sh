#!/usr/bin/env bash
# PostToolUse hook: warn (advisory, non-blocking) if the file the agent just edited
# bypasses the kit — importing @radix-ui/themes / radix-ui outside packages/ui, a raw
# <button>/<input>/<select>/<textarea> where a kit atom exists, or a direct import of a
# styling primitive the kit wraps. The checker exempts the kit itself. Always exits 0 —
# enforcement happens in lefthook/CI via `pnpm lint:catalog`.
set -euo pipefail

input="$(cat)"
file="$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&j.tool_input.file_path)||"")}catch{}})')"

case "$file" in
  *.ts | *.tsx)
    if [ -f "$file" ]; then
      pnpm exec tsx tooling/catalog-lint/src/check-catalog.ts "$file" 1>&2 || true
    fi
    ;;
esac

exit 0
