resource "helm_release" "cert_manager" {
    depends_on  = [ linode_lke_cluster.terraform_k8s ]
    name        = "cert-manager"
    repository  = "https://charts.jetstack.io"
    chart       = "cert-manager"
    namespace   = "cert-manager"
    version     = "v1.11.0"
    create_namespace = true

    set {
        name    = "installCRDs"
        value   = true
    }

    # set_list {
    #     name    = "extraArgs"
    #     value   = ["--dns01-recursive-nameservers-only", "--dns01-recursive-nameservers=8.8.8.8:53,8.8.4.4:53"]
    # }
}

# resource "helm_release" "cert_manager_linode" {
#     depends_on  = [ helm_release.cert_manager ]
#     name        = "cert-manager-linode"
#     chart       = "./charts/cert-manager-linode"
#     namespace   = "cert-manager"
# }


# run helm command for cert-manager-linode
# helm install cert-manager-webhook-linode \
#   --namespace cert-manager \
#   https://github.com/slicen/cert-manager-webhook-linode/releases/download/v0.2.0/cert-manager-webhook-linode-v0.2.0.tgz

# error creating because I'm using it in terraform, and the go run time (or os dependency package) is not available I think
# resource "helm_release" "cert_manager_webhook_linode" {
#     depends_on  = [ helm_release.cert_manager ]
#     name        = "cert-manager-webhook-linode"
#     chart       = "https://github.com/slicen/cert-manager-webhook-linode/releases/download/v0.2.0/cert-manager-webhook-linode-v0.2.0.tgz"
#     namespace   = "cert-manager"
#     version     = "v0.2.0"
# }

# resource "kubernetes_secret" "cert_manager_linode_credentials" {
#     depends_on  = [ helm_release.cert_manager ]
#     metadata {
#         name = "linode-credentials"
#         namespace = "cert-manager"
#     }
#     data = {
#         token = var.linode_api_token
#     }
# }

# resource "kubernetes_secret" "clouddns-dns01-solver-svc-acct" {
#     depends_on  = [ helm_release.cert_manager ]
#     metadata {
#         name = "clouddns-dns01-solver-svc-acct"
#         namespace = "cert-manager"
#     }
#     data = {
#         "key.json" = local.dns_service_account_key
#     }
# }