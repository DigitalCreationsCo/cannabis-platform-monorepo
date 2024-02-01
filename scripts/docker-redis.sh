#!/bin/sh

# development script to launch any local redis clients

if [ "$1" = "cart" ]; then
    echo "starting redis-cart db"

    docker run --name redis-cart -d -p 6300:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0

elif [ "$1" = "dispatch" ]; then
    echo "starting dispatch-redis-db"

    docker run --name redis-dispatch-clients -d -p 6311:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-dispatch-sockets -d -p 6321:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-dispatch-rooms -d -p 6331:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-sms-queue -d -p 6341:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
    
elif [ "$1" = "image-preview" ]; then
    echo "starting redis-image-preview db"

    docker run --name redis-image-preview -d -p 6351:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0

elif [ "$1" = "daily-deals" ]; then
    echo "starting redis-daily-deals db"

    docker run --name redis-daily-deals -d -p 6361:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0

elif [ "$1" = "all" ]; then
    echo "starting all redis db"

    # redis-cart client
    docker run --name redis-cart -d -p 6300:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-dispatch-clients -d -p 6311:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-dispatch-sockets -d -p 6321:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-dispatch-rooms -d -p 6331:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-sms-queue -d -p 6341:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-image-preview -d -p 6351:6379 redis redis-server --save 60 1 --loglevel warning
    docker run --name redis-daily-deals -d -p 6361:6379 redis redis-server --save 60 1 --loglevel warning
    exit 0
    
else
    echo "Invalid argument. Usage: $0 cart|dispatch|image-preview|daily-deals|all"
    exit 1
fi