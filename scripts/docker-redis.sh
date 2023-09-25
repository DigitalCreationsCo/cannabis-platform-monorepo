#!/bin/sh

if [ "$1" = "shop" ]; then
    echo "Running shop-redis-db"
    docker run --name shop-redis -d -p 6300:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
elif [ "$1" = "dispatch" ]; then
    echo "Running dispatch-redis-db"
    docker run --name dispatch-connect-redis -d -p 6302:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name socket-publish-redis -d -p 6303:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-rooms-redis -d -p 6304:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name message-publish-redis -d -p 6305:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
elif [ "$1" = "all" ]; then
    echo "Running all redis db"
    docker run --name shop-redis -d -p 6300:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-connect-redis -d -p 6302:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name socket-publish-redis -d -p 6303:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-rooms-redis -d -p 6304:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name message-publish-redis -d -p 6305:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
else
    echo "Invalid argument. Usage: $0 shop|dispatch|all"
    exit 1
fi