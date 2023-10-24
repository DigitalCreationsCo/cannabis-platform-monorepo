#!/bin/sh

docker network create redis-cart --driver bridge

for ((i=1; i<7; i++))
do
# docker run --name redis \
#     -e ALLOW_EMPTY_PASSWORD=yes \
#     -v /path/to/overrides.conf:/opt/bitnami/redis/mounted-etc/overrides.conf \
#     bitnami/redis:latest
# docker run --name redis-cart-$i -e ALLOW_EMPTY_PASSWORD=yes  --network redis-cart bitnami/redis-cluster:latest
PORT=$((6300 + i))
docker run --name redis-cart-$i -p $PORT:6379 -d redis redis-server --appendonly yes --protected-mode no --cluster-enabled yes
# docker run --name redis-cart-$i -dp $PORT:6379 -e ALLOW_EMPTY_PASSWORD=yes  --network redis-cart bitnami/redis:latest
done


REDIS_NODES=""
for ((i=1; i<7; i++)); do
  PORT=$((6300 + i))
  CONTAINER_NODE=$(docker inspect redis-cart-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}" | awk '!seen[$0]++' | tr -d '\n')
  echo "$CONTAINER_NODE:$PORT"
  # REDIS_NODES="${REDIS_NODES} ${CONTAINER_NODE}"
  REDIS_NODES="${REDIS_NODES} 127.0.0.1:$PORT"
done
REDIS_NODES="${REDIS_NODES#" "}"
REDIS_NODES="${REDIS_NODES%" "}"
export REDIS_NODES

echo "redis-cart Cluster IP addresses: $REDIS_NODES"
echo "redis-cli --cluster create $REDIS_NODES --cluster-replicas 1 --cluster-yes"

redis-cli --cluster create $REDIS_NODES --cluster-replicas 1 --cluster-yes