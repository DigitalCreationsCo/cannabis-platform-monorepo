FROM node:16 AS INSTALLER

WORKDIR /root
COPY . .

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"

RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus @cd/$BUILD_CONTEXT-app && yarn cache clear

FROM node:16 as BUILDER

WORKDIR /root

COPY --from=INSTALLER ./root . 

RUN yarn app:build $BUILD_CONTEXT

FROM node:16 AS RUNNER

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=BUILDER /root/apps/shop/package.json ./root/apps/shop/
COPY --from=BUILDER /root/apps/shop/next.config.mjs ./root/apps/shop
COPY --from=BUILDER /root/apps/shop/.next/standalone .
COPY --from=BUILDER /root/apps/shop/.next/static ./root/apps/shop/.next/static
# COPY --from=BUILDER /root/apps/shop/.next/static ./root/apps/shop/
COPY --from=BUILDER /root/apps/shop/public ./root/apps/shop/public

WORKDIR /root/apps/shop

EXPOSE 3000

CMD [ "node" "server.js" ]