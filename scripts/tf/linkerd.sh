helm repo update
helm search repo linkerd2-cni
helm repo add linkerd https://helm.linkerd.io/stable

# INSTALL LINKERD
# install the CNI plugin first, see here:
# https://linkerd.io/2.13/features/cni/
helm install linkerd-cni -n linkerd-cni --create-namespace linkerd/linkerd2-cni

# ensure the plugin is installed and ready
linkerd check --pre --linkerd-cni-enabled

helm install linkerd-crds linkerd/linkerd-crds \
  -n linkerd --create-namespace \
  --set cniEnabled=true

step certificate create root.cluster.local ca.crt ca.key \
  --profile root-ca --no-password --insecure

kubectl create secret tls \
  linkerd-trust-anchor \
  --cert=ca.crt \
  --key=ca.key \
  --namespace=linkerd

    kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: linkerd-identity
  namespace: linkerd
spec:
  ca:
    secretName: linkerd-trust-anchor
EOF

kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: linkerd-identity
  namespace: linkerd
spec:
  secretName: linkerd-identity
  duration: 48h
  renewBefore: 25h
  issuerRef:
    name: linkerd-identity
    kind: Issuer
  commonName: identity.cluster.local
  dnsNames:
  - identity.cluster.local
  isCA: true
  privateKey:
    algorithm: ECDSA
  usages:
  - cert sign
  - crl sign
  - server auth
  - client auth
EOF

helm install linkerd-control-plane -n linkerd \
  --set-file identityTrustAnchorsPEM=ca.crt \
  --set identity.issuer.scheme=kubernetes.io/tls \
  --set cniEnabled=true \
  linkerd/linkerd-control-plane

helm install linkerd-viz -n linkerd-viz --create-namespace linkerd/linkerd-viz

# TODO: 
# Linkerd webhook certificates must be rotated as well, eventually
https://linkerd.io/2.13/tasks/automatically-rotating-webhook-tls-credentials/
