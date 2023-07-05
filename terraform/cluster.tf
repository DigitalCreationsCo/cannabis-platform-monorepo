# resource "linode_lke_cluster" "gras_terraform_k8s" {
#     k8s_version = "${var.k8s_version}"
#     label="${var.k8s_label}"
#     region="${var.region}"
#     tags="${var.tags}"
    
#     dynamic "pool" {
#         for_each = var.pools
#         content { 

#             type = pool.value["type"]
#             count = pool.value["count"]

#             autoscaler {
#               min = 1
#               max = 2
#             }
#         }
#     }

# }

# resource "local_file" "kube_config" {
#     content = "${nonsensitive(base64decode(data.google_container_cluster.gras_terraform_cluster.config))}"
#     filename = "${local.k8s_config_file}"
#     file_permission = "0600"
# }

data "google_client_config" "provider" {}

data "google_container_cluster" "gras_terraform_cluster" {
  name     = var.cluster_label
  location = var.region
}

provider "kubernetes" {
  host  = "https://${data.google_container_cluster.gras_terraform_cluster.endpoint}"
  token = data.google_client_config.provider.access_token
  cluster_ca_certificate = base64decode(
    data.google_container_cluster.gras_terraform_cluster.master_auth[0].cluster_ca_certificate,
  )
}

