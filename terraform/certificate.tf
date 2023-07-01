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
}

resource "helm_release" "cert_manager_webhook_linode" {
    depends_on  = [ helm_release.cert_manager ]
    name        = "cert-manager-webhook-linode"
    chart       = "https://github.com/slicen/cert-manager-webhook-linode/releases/download/v0.2.0/cert-manager-webhook-linode-v0.2.0.tgz"
    namespace   = "cert-manager"
    version     = "v0.2.0"
}

resource "kubernetes_secret" "cert_manager_linode_credentials" {
    metadata {
        name = "linode-credentials"
        namespace = "cert-manager"
    }
    data = {
        token = var.linode_api_token
    }
}