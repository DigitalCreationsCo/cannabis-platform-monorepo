#!/bin/sh
BUILD_CONTEXT=$1

printenv > apps/${BUILD_CONTEXT}/.next/static/.env.local
node apps/$BUILD_CONTEXT/server.js