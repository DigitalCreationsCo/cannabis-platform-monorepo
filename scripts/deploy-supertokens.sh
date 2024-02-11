#!/bin/sh

# sh scripts/supertokens-dev.sh
docker build -t grasadmin/supertokens:7.0 -f Dockerfile.supertokens . && \
docker push grasadmin/supertokens:7.0 && \
yarn cluster:apply k8s/service.supertokens.yaml && \
echo "Supertokens deployed successfully"