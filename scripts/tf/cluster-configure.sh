helm repo update
helm search repo linkerd2-cni
helm repo add linkerd https://helm.linkerd.io/stable

terraform -chdir='./terraform' apply -auto-approve

kubectl create secret generic clouddns-dns01-solver-svc-acct \
   --from-file=dns-service-account.json -n cert-manager
kubectl apply -f k8s