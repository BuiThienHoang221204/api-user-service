# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy lockfile and package.json
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
# Set memory limit for Node.js build process to avoid OOM
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets and production dependencies from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Standard healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3001/ || exit 1

EXPOSE 3001

CMD ["node", "dist/main"]
