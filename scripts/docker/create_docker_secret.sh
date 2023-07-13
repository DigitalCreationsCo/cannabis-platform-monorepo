#!/bin/bash

# dockerSecret is k8s/secret.docker.yaml
# this file is here for reference

# place credential values here
. scripts/docker/docker_creds 

kubectl create secret docker-registry $NAME \
    --dry-run=client \
    --docker-server=$SERVER \
    --docker-username=$USERNAME \
    --docker-password=$PASSWORD \
    --docker-email=$EMAIL \
    --namespace=$NAMESPACE \
    -o yaml > k8s/secret.yaml
