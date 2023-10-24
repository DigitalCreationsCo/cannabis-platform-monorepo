#!/bin/bash

# Initialize the REDIS_NODES variable
REDIS_NODES=""

# Loop to retrieve and concatenate IP addresses
for ((i=1; i<7; i++)); do
  CONTAINER_NODE=$(docker inspect redis-cart-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}" | awk '!seen[$0]++' | tr -d '\n')
  REDIS_NODES="${REDIS_NODES} ${CONTAINER_NODE}"
done
# Remove leading/trailing spaces and export the variable
REDIS_NODES="${REDIS_NODES#" "}"
REDIS_NODES="${REDIS_NODES%" "}"
export REDIS_NODES

# Verify the result
echo "redis-cart Cluster IP addresses: $REDIS_NODES"