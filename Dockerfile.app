FROM node:16-alpine as node_modules

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_CONTEXT=$BUILD_CONTEXT
WORKDIR /root
COPY . .
RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn --frozen-lockfile


FROM node_modules as builder

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_CONTEXT=$BUILD_CONTEXT
WORKDIR /root
COPY . . 
RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspace @cd/$BUILD_CONTEXT run build:ci


FROM node:16-alpine

WORKDIR /root 
ARG BUILD_CONTEXT=$BUILD_CONTEXT
ARG PORT=$PORT
COPY --from=builder /root/apps/$BUILD_CONTEXT/package.json .
COPY --from=builder /root/apps/$BUILD_CONTEXT/ecosystem.config.js .
COPY --from=builder /root/apps/$BUILD_CONTEXT/public ./public
COPY --from=builder /root/apps/$BUILD_CONTEXT/.next/standalone .
COPY --from=builder /root/apps/$BUILD_CONTEXT/.next/standalone/apps/$BUILD_CONTEXT .
COPY --from=builder /root/apps/$BUILD_CONTEXT/.next/static ./.next/static

EXPOSE $PORT

CMD [ "yarn", "start" ]