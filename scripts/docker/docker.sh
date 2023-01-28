#!/usr/bin/env bash
# mount source files to a container for app build

# atm not using docker for deployment, only for build
# want to use for build, development, and deployment

BUILD_CONTEXT=$1

# pipe stdin to docker
tar --exclude='node_modules' --exclude='dist' -cf - . | docker build -f apps/app/Dockerfile - -t app

# create develop container
# docker run -it --mount "type=bind,source=$(pwd)/,target=/root" node:16.16.0z