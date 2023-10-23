#!/bin/sh

if [ $# -eq 0 ]; then
  echo "$0 missing argument: redis-<tag>"
  exit 1
fi

tag=$1

echo "">redis/redis-$tag-clusterIP
for ((i=1; i<7; i++))
do
docker inspect redis-$tag-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}" >> redis/redis-$tag-clusterIP
done
# "redis-cli --cluster create 172.17.0.3:6379 172.17.0.4:6379 172.17.0.5:6379 172.17.0.6:6379 172.17.0.7:6379 172.17.0.8:6379 --cluster-replicas 1" >> redis/redis-$tag-clusterIP
# echo "redis-cli --cluster create 172.17.0.3:6379 172.17.0.4:6379 172.17.0.5:6379 172.17.0.6:6379 172.17.0.7:6379 172.17.0.8:6379 --cluster-replicas 1"