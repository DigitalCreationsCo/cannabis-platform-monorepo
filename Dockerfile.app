FROM node:16-alpine as node_modules

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_TYPE
ARG BUILD_CONTEXT
WORKDIR /root
COPY . .
RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus @cd/$BUILD_TYPE-$BUILD_CONTEXT


FROM node_modules as builder

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_TYPE
ARG BUILD_CONTEXT
COPY ./root ./root 
WORKDIR /root
RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspaces foreach -itR --from @cd/$BUILD_TYPE-$BUILD_CONTEXT run build:ci


FROM node:16-alpine

ARG BUILD_TYPE
ARG BUILD_CONTEXT
ARG PORT
COPY --from=builder /root/apps/$BUILD_CONTEXT/.next/standalone ./root
COPY --from=builder /root/apps/$BUILD_CONTEXT/.next/static ./root/apps/$BUILD_CONTEXT/.next/static
COPY --from=builder /root/apps/$BUILD_CONTEXT/public ./root/apps/$BUILD_CONTEXT/public
WORKDIR /root/apps/$BUILD_CONTEXT
EXPOSE $PORT
CMD [ "yarn", "start", "--env", "production"]    