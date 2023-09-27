echo 'Run the script commands manually to get the gateway-proxy config dump'
sleep 1
echo 'exit'
exit 0

# 1. pick a gateway-proxy pod
kubectl -n gloo-system get pod -l "gloo=gateway-proxy"
# 2. port-forward on port 19000
kubectl -n gloo-system port-forward gateway-proxy-5d996bcbc4-27s6c 19002
# 3a. generate the config dump
curl -X POST 127.0.0.1:19002/config_dump > gateway-config.json
# 3b. optionally include the upstream endpoints in the config dump
curl -X POST 127.0.0.1:19002/config_dump\?include_eds > gateway-config.json
