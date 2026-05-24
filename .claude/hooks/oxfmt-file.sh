#!/usr/bin/env bash
# PostToolUse hook: format the file the agent just edited with oxfmt.
# Reads the tool-call JSON from stdin, extracts the file path, formats supported
# file types in place. Always exits 0 so a formatting hiccup never blocks work.
set -euo pipefail

input="$(cat)"
file="$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&j.tool_input.file_path)||"")}catch{}})')"

if [ -n "$file" ] && [ -f "$file" ]; then
  case "$file" in
    *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.jsonc|*.css|*.md|*.mdx|*.yaml|*.yml)
      pnpm exec oxfmt --write "$file" >/dev/null 2>&1 || true
      ;;
  esac
fi

exit 0
