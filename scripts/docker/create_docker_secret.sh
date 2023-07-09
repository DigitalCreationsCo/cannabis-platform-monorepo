#!/bin/bash

. scripts/docker/docker_creds 

# dockerSecret is now in k8s/secret.docker.yaml
# this command is here for what ifs

kubectl create secret docker-registry $NAME \
    --dry-run=client \
    --docker-server=$SERVER \
    --docker-username=$USERNAME \
    --docker-password=$PASSWORD \
    --docker-email=$EMAIL \
    --namespace=$NAMESPACE \
    -o yaml > k8s/secret.yaml
