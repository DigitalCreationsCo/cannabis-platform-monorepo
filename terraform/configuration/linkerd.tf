# PREFER TO USE scripts/tf/linkerd.sh for helm install

# note: terraform may fail to install linkerd with helm if namespace is not create in advance

# note: if there is an issue with service account or secrets relating to linkerd, check this issue: https://www.reddit.com/r/devops/comments/gbo3pc/how_to_use_linkerd_with_terraform/
# run `helm repo add linkerd https://helm.linkerd.io/stable`

# this resource is create during the cluster configuration script
# resource "kubernetes_secret" "linkerd_trust_anchor" {
#     metadata {
#         name      = "linkerd-trust-anchor"
#         namespace = "linkerd"
#     }

#     type          = "tls"

#     data = {
#         "tls.cert"  = local.ca_certificate
#         "tls.key"   = local.ca_key
#     }
# }

# resource "kubernetes_manifest" "issuer_linkerd_identity" {
#     manifest = yamldecode(local.issuer_linkerd_identity)
# }

# resource "kubernetes_manifest" "certificate_linkerd_identity" {
#     # depends_on = [ kubernetes_manifest.linkerd_identity_issuer ]
#     manifest = yamldecode(local.certificate_linkerd_identity)
# }

# resource "helm_release" "linkerd_cni" {
#     name        = "linkerd-cni"

#     namespace   = "linkerd-cni"
#     repository  = "linkerd"
#     chart       = "linkerd2-cni"
    
#     atomic      = true
#     create_namespace = true
#     depends_on = [ linode_lke_cluster.terraform_k8s ]
# }

# resource "helm_release" "linkerd_crds" {
#     name        = "linkerd-crds"

#     namespace   = "linkerd"
#     repository  = "linkerd"
#     chart       = "linkerd-crds"
#     version     = "1.6.1"

#     set {
#         name    = "cniEnabled"
#         value   = true
#     }

#     create_namespace = true
#     atomic      = true
#     depends_on = [ helm_release.linkerd_cni ]
# }

# resource "helm_release" "linkerd_control_plane" {
#     name        = "linkerd-control-plane"

#     namespace   = "linkerd"
#     repository  = "linkerd"
#     chart       = "linkerd-control-plane"
#     version     = "1.12.5"

#     set {
#         name    = "cniEnabled"
#         value   = true
#     }

#     set {
#         name    = "identityTrustAnchorsPEM"
#         value   = local.ca_certificate
#     }

#     set {
#         name    = "identity.issuer.scheme"
#         value   = "kubernetes.io/tls"
#     }
    
#     create_namespace = true
#     atomic      = true
#     depends_on = [ 
#         helm_release.linkerd_crds
#     ]
# }

# resource "helm_release" "linkerd_viz" {
#     name        = "linkerd-viz"

#     namespace   = "linkerd-viz"
#     repository  = "linkerd"
#     chart       = "linkerd-viz"
#     version     = "30.8.5"
#     create_namespace = true

#     atomic      = true
#     depends_on = [ helm_release.linkerd_control_plane ]
# }