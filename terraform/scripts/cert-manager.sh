# for issue with installation in the cloud provider, see here:
# https://cert-manager.io/docs/installation/compatibility/

# INSTALL CERT-MANAGER
# optional: install cmctl cli
# run `brew install cmctl`

helm repo add jetstack https://charts.jetstack.io
helm repo update

# install cert-manager with crds
# https://artifacthub.io/packages/helm/cert-manager/cert-manager
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.12.0 \
  --set installCRDs=true
#   --set webhook.timeoutSeconds=4   # Example: changing the webhook timeout using a Helm parameter

# VERIFY INSTALLATION
# to verify, run `cmctl check api`

# test the installation webhook by creating a test certificate
# 1. run `cat <<EOF > test-resources.yaml
# apiVersion: v1
# kind: Namespace
# metadata:
#   name: cert-manager-test
# ---
# apiVersion: cert-manager.io/v1
# kind: Issuer
# metadata:
#   name: test-selfsigned
#   namespace: cert-manager-test
# spec:
#   selfSigned: {}
# ---
# apiVersion: cert-manager.io/v1
# kind: Certificate
# metadata:
#   name: selfsigned-cert
#   namespace: cert-manager-test
# spec:
#   dnsNames:
#     - example.com
#   secretName: selfsigned-cert-tls
#   issuerRef:
#     name: test-selfsigned
# EOF`

# 2. apply the test resources
# run `kubectl apply -f test-resources.yaml`

# 3. check the status after a few seconds
# run `kubectl describe certificate -n cert-manager-test`

# 4. delete the test resources
# run `kubectl delete -f test-resources.yaml`

# UNINSTALL CERT-MANAGER
# to uninstall cert-manager, see here:
# https://cert-manager.io/docs/installation/helm/#uninstalling-with-helm

# TODO:
# Resolve Dns Zones With Dns-01 Solver:
# https://cert-manager.io/docs/configuration/acme/dns01/acme-dns/


# example secret for cloud dns dns-01 solver
# kubectl create secret generic clouddns-dns01-solver-svc-acct \
#    --from-file=dns-service-account.json -n cert-manager
# kubectl apply -f k8s
