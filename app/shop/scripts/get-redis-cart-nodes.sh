#!/bin/bash

# Initialize the variable to store the concatenated IP addresses
REDIS_NODES=""

# Run the loop to inspect Docker containers and capture IP addresses
for ((i=1; i<7; i++)); do
  CONTAINER_NODE=$(docker inspect redis-cart-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}")
  REDIS_NODES="$REDIS_NODES $CONTAINER_NODE"
done

# Remove leading/trailing spaces and export the variable
REDIS_NODES="${REDIS_NODES#" "}"
REDIS_NODES="${REDIS_NODES%" "}"
export REDIS_NODES

# Verify the result
echo "redis-cart Cluster IP addresses: $REDIS_NODES"