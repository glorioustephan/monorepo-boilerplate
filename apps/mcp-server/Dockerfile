# Multi-stage build for the MCP server. Build from the REPO ROOT:
#   docker build -f apps/mcp-server/Dockerfile -t monorepo-boilerplate-mcp .
FROM node:22-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

# Produce a pruned workspace: out/json (manifests + lockfile, for a cached
# install layer) and out/full (only the files this app's graph needs).
FROM base AS pruner
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo prune @monorepo-boilerplate/mcp-server --docker

FROM base AS build
WORKDIR /repo
# Install against manifests only — this layer is reused until the lockfile or a
# package.json changes, so editing source no longer triggers a reinstall.
COPY --from=pruner /repo/out/json/ ./
RUN pnpm install --frozen-lockfile
# Bring in source, build, and prune to a self-contained deployable at /out.
COPY --from=pruner /repo/out/full/ ./
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
