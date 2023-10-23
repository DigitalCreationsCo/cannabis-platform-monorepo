#!/bin/sh

if [ "$1" = "cart" ]; then
    echo "Running redis-cart db"
    (cd redis/6301 && redis-server redis.conf --daemonize yes)
    (cd redis/6302 && redis-server redis.conf --daemonize yes)
    (cd redis/6303 && redis-server redis.conf --daemonize yes)
    (cd redis/6304 && redis-server redis.conf --daemonize yes)
    (cd redis/6305 && redis-server redis.conf --daemonize yes)
    (cd redis/6306 && redis-server redis.conf --daemonize yes)
    redis-cli --cluster create 127.0.0.1:6301 127.0.0.1:6302 127.0.0.1:6303 --cluster-replicas 1 --cluster-yes

    docker run \
    --name redis-cart \
    -dp 6300:6301 \
    -e ALLOW_EMPTY_PASSWORD=yes \
    -e REDIS_NODES="127.0.0.1:6301 127.0.0.1:6302 127.0.0.1:6303 127.0.0.1:6304 127.0.0.1:6305 127.0.0.1:6306" \
    -e REDIS_CLUSTER_REPLICAS=1 \
    bitnami/redis-cluster:latest
    exit 0
elif [ "$1" = "dispatch" ]; then
    echo "Running dispatch-redis-db"
    docker run --name dispatch-connect-redis -d -p 6311:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name socket-publish-redis -d -p 6321:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-rooms-redis -d -p 6331:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name message-publish-redis -d -p 6341:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
elif [ "$1" = "all" ]; then
    echo "Running all redis db"

    # redis-cart client
    docker run \
    --name redis-cart \
    -d \
    -e ALLOW_EMPTY_PASSWORD=yes \
    -e REDIS_NODES="1 2 3" \
    bitnami/redis-cluster:latest
    redis-cli --cluster create node1:6301 node2:6302 node3:6303 --cluster-replicas 1 --cluster-yes

    docker run --name dispatch-connect-redis -d -p 6311:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name socket-publish-redis -d -p 6321:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-rooms-redis -d -p 6331:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name message-publish-redis -d -p 6341:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
else
    echo "Invalid argument. Usage: $0 cart|dispatch|all"
    exit 1
fi