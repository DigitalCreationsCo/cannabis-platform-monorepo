# Install environment
FROM node:16.16.0 as build

# build folder
ARG BUILD_CONTEXT
ENV BUILD_CONTEXT=$BUILD_CONTEXT
WORKDIR /root

# copy root workspace package.json
COPY package.json yarn.lock* ./

# copy app package.json
COPY ./apps/$BUILD_CONTEXT/package.json apps/$BUILD_CONTEXT/
RUN yarn install

# copy app source code and create build
COPY ./apps/$BUILD_CONTEXT/ apps/$BUILD_CONTEXT/
RUN yarn build:$BUILD_CONTEXT
# uncomment this when turborepo is installed
# RUN yarn turbo run build --filter=web...

# CURRENTLY ADDING BIND MOUNTS TO DEV IMAGE
CMD yarn workspace $BUILD_CONTEXT start