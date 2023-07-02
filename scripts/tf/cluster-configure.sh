helm repo update
helm search repo linkerd2-cni
helm repo add linkerd https://helm.linkerd.io/stable

terraform -chdir='./terraform' apply