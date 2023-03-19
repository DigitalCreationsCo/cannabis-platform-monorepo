#!/bin/sh
BUILD_CONTEXT=$1

printenv > apps/${BUILD_CONTEXT}/.env
node apps/$BUILD_CONTEXT/server.js