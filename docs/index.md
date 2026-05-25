---
layout: home
hero:
  name: '@monorepo-boilerplate'
  text: 'Turborepo + pnpm monorepo template'
  tagline: Next.js 16, React 19, an MCP server, and a tiered UI component catalog — wired for humans and AI agents alike.
  actions:
    - theme: brand
      text: Conventions
      link: /conventions
    - theme: alt
      text: Roadmap
      link: /roadmap
features:
  - title: Strict TypeScript, source-first
    details: Internal packages export TypeScript source — HMR across package boundaries with no build step. Strict config with noUncheckedIndexedAccess and verbatimModuleSyntax.
  - title: oxlint + oxfmt
    details: Fast Rust-based linting and formatting, with custom AST checks (token contract, catalog enforcement) oxlint can't express.
  - title: AI-consumable UI catalog
    details: The Radix Themes kit is a tiered vocabulary (Component / Recipe / Block / Template) that the mcp-ui server indexes into a node:sqlite + FTS5 database for agents to query with hybrid search.
  - title: Cross-agent conventions
    details: AGENTS.md and .claude/reference/ keep humans and AI coding agents consistent. This site is the browsable companion.
---
