#!/usr/bin/env bash
# PostToolUse hook: warn (advisory, non-blocking) if the file the agent just
# edited carries an LLM code smell — a not-implemented stub, swallowed catch,
# stray console.log, `any` escape, or an export missing JSDoc.
# Always exits 0 — this is a nudge while authoring; nothing enforces it on commit.
set -euo pipefail

input="$(cat)"
file="$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&j.tool_input.file_path)||"")}catch{}})')"

case "$file" in
  *.ts | *.tsx)
    if [ -f "$file" ]; then
      pnpm exec tsx tooling/catalog-lint/src/check-smells.ts "$file" 1>&2 || true
    fi
    ;;
esac

exit 0
