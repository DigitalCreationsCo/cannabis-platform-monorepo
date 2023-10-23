#!/bin/sh

if [ $# -eq 0 ]; then
  echo "$0 missing argument: redis-<tag>"
  exit 1
fi
tag=$1
# create docker redis instance
for ((i=1; i<7; i++))
do
docker run --name redis-$tag-$i -p 630$i:6379 -d redis redis-server --appendonly yes --protected-mode no --cluster-enabled yes
done


ip_file="redis/redis-$tag-clusterIP"
echo cluster ip address file: $ip_file
echo "find redis node ip and then build the cluster"
# create cluster ip address file
for ((i=1; i<7; i++))
do
docker inspect redis-$tag-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}" >> redis/redis-$tag-clusterIP
done


# Initialize an empty string to store the concatenated IP addresses
concatenated_ips=""
# Check if the file exists
if [ -f "$ip_file" ]; then
  while read -r ip; do
    # Concatenate the IP address to the existing string with a space separator
    concatenated_ips="$concatenated_ips $ip"
  done < "$ip_file"
else
  echo "Cluster IP address file '$ip_file' not found."
  exit 1
fi

# Remove leading/trailing spaces and print the concatenated IP addresses
concatenated_ips="${concatenated_ips#" "}"
concatenated_ips="${concatenated_ips%" "}"
echo "Concatenated IP addresses: $concatenated_ips"

echo "redis-cli --cluster create $concatenated_ips --cluster-replicas 1"