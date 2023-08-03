FROM --platform=linux/amd64 node:16-alpine as node_modules

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_TYPE
ARG BUILD_CONTEXT
WORKDIR /root
COPY . .
RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --all


FROM node_modules as builder

ENV NODE_ENV=production
ENV YARN_VERSION "3.3.1"
ARG BUILD_TYPE
ARG BUILD_CONTEXT
COPY . .
RUN yarn set version $YARN_VERSION
RUN yarn plugin import workspace-tools
RUN yarn workspaces foreach -itR --from @cd/$BUILD_TYPE-$BUILD_CONTEXT run build:ci


FROM --platform=linux/amd64 node:16-alpine

ARG BUILD_TYPE
ARG BUILD_CONTEXT
ARG PORT
COPY --from=builder /root/$BUILD_TYPE/$BUILD_CONTEXT/.next/standalone  ./root
COPY --from=builder /root/$BUILD_TYPE/$BUILD_CONTEXT/.next/static      ./root/$BUILD_TYPE/$BUILD_CONTEXT/.next/static
COPY --from=builder /root/$BUILD_TYPE/$BUILD_CONTEXT/public            ./root/$BUILD_TYPE/$BUILD_CONTEXT/public
WORKDIR /root/$BUILD_TYPE/$BUILD_CONTEXT

ENV NEXT_PUBLIC_APP_DOMAIN="grascannabis.org"
ENV NEXT_PUBLIC_SHOP_APP_URL="https://grascannabis.org"
ENV NEXT_PUBLIC_DASHBOARD_APP_URL="https://app.grascannabis.org"
ENV BACKEND_URL=https://backend.grascannabis.org
ENV NEXT_PUBLIC_SERVER_MAIN_URL="https://backend.grascannabis.org/main"
ENV NEXT_PUBLIC_SERVER_LOCATION_URL="https://backend.grascannabis.org/location"
ENV NEXT_PUBLIC_SERVER_PAYMENTS_URL="https://backend.grascannabis.org/payments"
ENV NEXT_PUBLIC_SERVER_IMAGE_URL="https://backend.grascannabis.org/image"
ENV NEXT_PUBLIC_SERVER_DISPATCH_URL="https://backend.grascannabis.org/dispatch"

EXPOSE $PORT
CMD [ "yarn", "start", "--env", "production"]    