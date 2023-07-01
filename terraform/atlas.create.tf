# resource "helm_release" "atlas_operator" {
#     name        = "atlas-operator"

#     namespace   = "atlas-operator"
#     repository  = "https://mongodb.github.io/helm-charts"
#     chart       = "mongodb-atlas-operator"
    
#     atomic      = true
#     create_namespace = true
#     depends_on = [ linode_lke_cluster.terraform_k8s ]
# }