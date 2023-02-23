FROM node:16.16-alpine AS builder
ENV YARN_VERSION 3.3.1
ENV TURBO_VERSION 1.6.3

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install turbo@$TURBO_VERSION --location=global
COPY . .
RUN turbo prune --scope=@cd/app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM --platform=linux/amd64 node:16.16-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=@cd/app...

FROM node:16.16-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

CMD node apps/web/server.js



# FROM node:16.18-alpine as server-builder
# WORKDIR /root/monorepo
# ENV TURBO_VERSION 1.6.3

# RUN apk update && \
#     apk add --no-cache libc6-compat && \
#     apk add openssl openssl-dev
# RUN npm install turbo@$TURBO_VERSION --location=global
# COPY . .

# RUN --mount=type=cache,target=/.yarn/cache \
#     turbo prune --scope=@cd/app && \
#     cp -R .yarn .yarnrc.yml out/ && \
#     cd out && \
#     yarn install && \
#     npx prisma generate && \
#     yarn turbo run build --filter=@cd/app && \
#     yarn workspaces focus --all --production && \
#     rm -rf node_modules/.cache .yarn/cache apps/app/.next/cache

# FROM node:16.18-alpine as app

# ENV NODE_ENV=production
# WORKDIR /root/app
# COPY --chown=node:node --from=server-builder /root/monorepo/out .

# USER node
# CMD ["yarn", "start"]


# # FROM --platform=linux/amd64 node:16-alpine3.17
# # # # Set working directory
# # # WORKDIR /usr/app
# # # # Install PM2 globally
# # # RUN npm install --global pm2
# # # # Copy "package.json" and "package-lock.json" before other files
# # # # Utilise Docker cache to save re-installing dependencies if unchanged
# # # COPY ./package*.json ./
# # # COPY ../../yarn.lock ./
# # # # Install dependencies
# # # RUN yarn set version berry
# # # RUN yarn install
# # # # Copy all files
# # # COPY ./ ./
# # # # Build app
# # # RUN yarn build
# # # # Expose the listening port
# # # EXPOSE 3000
# # # # Run container as non-root (unprivileged) user
# # # # The "node" user is provided in the Node.js Alpine base image
# # # USER node
# # # # Launch app with PM2
# # # CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]

# # ENV YARN_VERSION 3.3.1
# # ENV TURBO_VERSION 1.6.3
# # # RUN apk add --no-cache libc6-compat
# # # RUN apk add --update --no-cache libc6-compat openssl openssl-dev
# # # RUN apk add --update --no-cache libc6-compat openssl libressl-dev
# # # RUN apt-get install openssl openssl-dev libc6 
# # RUN apk add --update --no-cache libc6-compat openssl1.1-compat
# # WORKDIR /root/monorepo
# # COPY . .
# # RUN npm install --global pm2
# # RUN npm install --global turbo@$TURBO_VERSION
# # RUN yarn set version $YARN_VERSION
# # RUN yarn install

# # # RUN apk update && apk add openssl openssl-dev
# # #  libssl-dev
# # # RUN yarn db generate
# # RUN npx prisma generate
# # RUN yarn build

# # WORKDIR /root/monorepo/apps/app
# # EXPOSE 3000
# # USER node
# # CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]
# # # RUN docker run --rm -it -p3000:3000 web