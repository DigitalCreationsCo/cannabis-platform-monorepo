#!/bin/sh

yarn docker:build-supertokens
docker push grasadmin/supertokens:7.0
yarn cluster:apply k8s/service.supertokens.yaml

echo "Supertokens deployed successfully"