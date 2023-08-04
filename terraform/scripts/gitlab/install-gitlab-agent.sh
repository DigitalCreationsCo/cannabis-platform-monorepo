#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"

helm repo add gitlab https://charts.gitlab.io
helm repo update

helm upgrade --install gras-cluster gitlab/gitlab-agent \
    --namespace gitlab-agent-gras-cluster \
    --create-namespace \
    --set image.tag=v16.3.0-rc5 \
    --set config.token="${TOKEN}" \
    --set config.kasAddress=wss://kas.gitlab.com
    # --set-file config.caCert=my-custom-ca.pem
