FROM node:16.16-alpine AS builder

ENV YARN_VERSION 3.3.1
ENV TURBO_VERSION 1.6.3
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY . .

RUN npm install turbo@$TURBO_VERSION --location=global
# RUN yarn set version $YARN_VERSION
RUN yarn install
# RUN yarn add turbo@$TURBO_VERSION

RUN yarn turbo prune --scope=@cd/app --docker

FROM node:16.16-alpine AS installer
ENV YARN_VERSION 3.3.1
ENV TURBO_VERSION 1.6.3

RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

# RUN yarn set version $YARN_VERSION
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build --filter=@cd/app...

FROM node:16.16-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/app/next.config.mjs .
COPY --from=installer /app/apps/app/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/static ./apps/app/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/public ./apps/app/public

EXPOSE 3001

CMD node apps/app/server.js
