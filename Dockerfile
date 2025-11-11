# build stage
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

# copy package manifests first for better caching
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --production=false; else npm install; fi

# copy source and build
COPY . .
RUN npm run build

# runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# optional: create non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

# copy runtime artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]