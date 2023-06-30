resource "helm_release" "cert_manager" {
    depends_on  = [ linode_lke_cluster.terraform_k8s ]
    name        = "cert-manager"
    repository  = "https://charts.jetstack.io"
    chart       = "cert-manager"
    namespace   = "cert-manager"
    version     = "v1.12.0"
    create_namespace = true

    set {
        name    = "installCRDs"
        value   = true
    }
}