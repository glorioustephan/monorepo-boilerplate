# Multi-stage build for the MCP server. Build from the REPO ROOT:
#   docker build -f apps/mcp-server/Dockerfile -t monorepo-boilerplate-mcp .
FROM node:22-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

FROM base AS build
WORKDIR /repo
COPY . .
# Install the full workspace, then build the MCP server and prune to a
# self-contained deployable directory at /out.
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @monorepo-boilerplate/mcp-server build
RUN pnpm --filter @monorepo-boilerplate/mcp-server deploy --prod /out

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /out/dist ./dist
COPY --from=build /out/node_modules ./node_modules
COPY --from=build /out/package.json ./package.json
USER node
# stdio transport: the container talks JSON-RPC over stdin/stdout.
ENTRYPOINT ["node", "dist/index.mjs"]
