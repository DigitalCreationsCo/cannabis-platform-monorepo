#!/bin/sh

# development script to launch any local redis clients

if [ "$1" = "cart" ]; then
    echo "starting redis-cart db"

    docker run --name redis-cart -d -p 6300:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0

elif [ "$1" = "dispatch" ]; then
    echo "starting dispatch-redis-db"

    docker run --name dispatch-connect-redis -d -p 6311:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name socket-publish-redis -d -p 6321:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-rooms-redis -d -p 6331:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name message-publish-redis -d -p 6341:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
    
elif [ "$1" = "all" ]; then
    echo "starting all redis db"

    # redis-cart client
    docker run --name redis-cart -d -p 6300:6379 redis redis-server --save 60 1 --loglevel warning

    docker run --name dispatch-connect-redis -d -p 6311:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name socket-publish-redis -d -p 6321:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name dispatch-rooms-redis -d -p 6331:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name message-publish-redis -d -p 6341:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
    
else
    echo "Invalid argument. Usage: $0 cart|dispatch|all"
    exit 1
fi