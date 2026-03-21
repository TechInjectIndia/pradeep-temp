FROM oven/bun:1.1-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

# Copy source
COPY . .

EXPOSE 3001

# Run migrations then start server
CMD ["sh", "-c", "bun src/db/migrate.ts && bun src/server.ts"]
