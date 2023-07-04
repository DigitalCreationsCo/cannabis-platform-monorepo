# Run scripts/tf/create-trust-anchor.sh to create the trust anchor and install linkerd using helm

terraform -chdir='./terraform' apply

# kubectl create secret generic clouddns-dns01-solver-svc-acct \
#    --from-file=dns-service-account.json -n cert-manager
# kubectl apply -f k8s