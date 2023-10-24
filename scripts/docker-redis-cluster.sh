#!/bin/sh

if [ $# -eq 0 ]; then
  echo "$0 missing argument: redis-<tag>"
  exit 1
fi
tag=$1
# Create docker redis instance with incrementing port
for ((i=1; i<7; i++))
do
  port=$((6300 + i))
  docker run --name redis-$tag-$i -p $port:6379 -d redis redis-server --appendonly yes --protected-mode no --cluster-enabled yes
done

# # Initialize an empty string to store the concatenated IP addresses with ports
# concatenated_ips=""
# # Check if the file exists
# ip_file="redis/redis-$tag-clusterIP"
# if [ -f "$ip_file" ]; then
#   while read -r ip; do
#     port=$((6300 + i))
#     concatenated_ips="$concatenated_ips $ip:$port"
#   done < "$ip_file"
# else
#   echo "Cluster IP address file '$ip_file' not found."
#   exit 1
# fi

for ((i=1; i<7; i++)); do
  port=$((6300 + i))
  CONTAINER_NODE=$(docker inspect redis-cart-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}" | awk '!seen[$0]++' | tr -d '\n')
  REDIS_NODES="${REDIS_NODES} 127.0.0.1:$port"
done
# Remove leading/trailing spaces and export the variable
REDIS_NODES="${REDIS_NODES#" "}"
REDIS_NODES="${REDIS_NODES%" "}"
echo "redis-cart Cluster IP addresses: $REDIS_NODES"

echo "redis-cli --cluster create $REDIS_NODES --cluster-replicas 1 --cluster-yes"


# #!/bin/sh

# if [ $# -eq 0 ]; then
#   echo "$0 missing argument: redis-<tag>"
#   exit 1
# fi
# tag=$1
# # create docker redis instance
# for ((i=1; i<7; i++))
# do
# docker run --name redis-$tag-$i -p 630$i:6379 -d redis redis-server --appendonly yes --protected-mode no --cluster-enabled yes
# done


# ip_file="redis/redis-$tag-clusterIP"
# echo cluster ip address file: $ip_file
# echo "find redis node ip and then build the cluster"
# # create cluster ip address file
# for ((i=1; i<7; i++))
# do
# docker inspect redis-$tag-$i | grep IPAddress | egrep -o "([0-9]{1,3}.){3}[0-9]{1,3}" >> redis/redis-$tag-clusterIP
# done


# # Initialize an empty string to store the concatenated IP addresses
# concatenated_ips=""
# # Check if the file exists
# if [ -f "$ip_file" ]; then
#   while read -r ip; do
#     # Concatenate the IP address to the existing string with a space separator
#     concatenated_ips="$concatenated_ips $ip"
#   done < "$ip_file"
# else
#   echo "Cluster IP address file '$ip_file' not found."
#   exit 1
# fi

# # Remove leading/trailing spaces and print the concatenated IP addresses
# concatenated_ips="${concatenated_ips#" "}"
# concatenated_ips="${concatenated_ips%" "}"
# echo "Concatenated IP addresses: $concatenated_ips"

# echo "redis-cli --cluster create $concatenated_ips --cluster-replicas 1"