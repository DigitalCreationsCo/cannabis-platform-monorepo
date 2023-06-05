FROM node:16 AS INSTALLER

WORKDIR /root
COPY . .

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_CONTEXT=$BUILD_CONTEXT

RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus @cd/$BUILD_CONTEXT-app

FROM node:16 as BUILDER

WORKDIR /root

COPY --from=INSTALLER ./root . 

ARG BUILD_CONTEXT=$BUILD_CONTEXT

RUN yarn workspaces foreach -itR --from @cd/$BUILD_CONTEXT-app run build

FROM node:16 AS RUNNER

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

ARG BUILD_CONTEXT=$BUILD_CONTEXT

COPY --from=BUILDER /root/apps/$BUILD_CONTEXT/next.config.mjs ./root
COPY --from=BUILDER /root/apps/$BUILD_CONTEXT/package.json ./root

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=BUILDER /root/apps/$BUILD_CONTEXT/.next/standalone ./root/apps/$BUILD_CONTEXT/.next/standalone
COPY --from=BUILDER /root/apps/$BUILD_CONTEXT/.next/static ./root/apps/$BUILD_CONTEXT/.next/static
COPY --from=BUILDER /root/apps/$BUILD_CONTEXT/public ./root/apps/$BUILD_CONTEXT/public

WORKDIR /root/apps/$BUILD_CONTEXT

EXPOSE 3000

CMD [ "yarn", "start" ]