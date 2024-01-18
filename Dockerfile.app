FROM grasadmin/node_modules as cache

FROM --platform=linux/amd64 node:18-alpine3.19 as build
ARG BUILD_TYPE
ARG BUILD_CONTEXT
WORKDIR /root
RUN echo "Building $BUILD_TYPE/$BUILD_CONTEXT"
COPY $BUILD_TYPE/$BUILD_CONTEXT /root/$BUILD_TYPE/$BUILD_CONTEXT

FROM --platform=linux/amd64 node:18-alpine3.19
ENV NODE_ENV=production
ARG BUILD_TYPE
ARG BUILD_CONTEXT
ARG PORT
ENV PORT=$PORT

WORKDIR /root

COPY --from=cache /node_modules ./node_modules
COPY --from=build /root/$BUILD_TYPE/$BUILD_CONTEXT/.next/standalone  /root
COPY --from=build /root/$BUILD_TYPE/$BUILD_CONTEXT/.next/static      /root/$BUILD_TYPE/$BUILD_CONTEXT/.next/static
COPY --from=build /root/$BUILD_TYPE/$BUILD_CONTEXT/public            /root/$BUILD_TYPE/$BUILD_CONTEXT/public

WORKDIR /root/$BUILD_TYPE/$BUILD_CONTEXT

ENV NEXT_PUBLIC_APP_DOMAIN="grascannabis.org"
ENV NEXT_PUBLIC_SHOP_APP_URL="https://grascannabis.org"
ENV NEXT_PUBLIC_DASHBOARD_APP_URL="https://app.grascannabis.org"
ENV BACKEND_URL=https://backend.grascannabis.org
ENV NEXT_PUBLIC_SERVER_MAIN_URL="https://backend.grascannabis.org/main"
ENV NEXT_PUBLIC_SERVER_PAYMENTS_URL="https://backend.grascannabis.org/payments"
ENV NEXT_PUBLIC_SERVER_IMAGE_URL="https://backend.grascannabis.org/image"
ENV NEXT_PUBLIC_SERVER_DISPATCH_URL="https://backend.grascannabis.org/dispatch"
ENV NEXT_PUBLIC_SERVER_SMS_URL="https://backend.grascannabis.org/sms"

EXPOSE $PORT

ENV HOSTNAME "0.0.0.0"

CMD [ "yarn", "start", "--env", "production"]    