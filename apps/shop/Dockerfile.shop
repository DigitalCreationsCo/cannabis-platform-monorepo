FROM node:16.16-alpine AS builder

ENV YARN_VERSION 3.3.1
ENV TURBO_VERSION 1.6.3
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm install turbo@$TURBO_VERSION --location=global
# RUN yarn global add turbo
COPY . .
COPY package.json .

RUN turbo prune --scope=@cd/shop --docker

FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build --filter=@cd/shop...

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/shop/next.config.js .
COPY --from=installer /app/apps/shop/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/shop/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/shop/.next/static ./apps/shop/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/shop/public ./apps/shop/public

CMD node apps/shop/server.js