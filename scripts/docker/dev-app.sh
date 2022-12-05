#!/usr/bin/env bash

# what does this script do?
# mounts source files to a container for easy rebuild during development

# is this needed?
# atm, no, because I am not using docker for deployment, only for build
echo 'dev app script'
BUILD_CONTEXT=$1

docker run -it --mount "type=bind,source=$(pwd)/,target=/root" cannabis-platform-monorepo-app