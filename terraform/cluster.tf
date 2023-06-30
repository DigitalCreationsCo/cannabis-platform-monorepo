resource "local_file" "k8s_config" {
    content = "${nonsensitive(base64decode(linode_lke_cluster.terraform_k8s.kubeconfig))}"
    filename = "${local.k8s_config_file}"
    file_permission = "0600"
}

# 139.144.164.21 node balancer ip
resource "linode_lke_cluster" "terraform_k8s" {
    k8s_version = "${var.k8s_version}"
    label="${var.k8s_label}"
    region="${var.region}"
    tags="${var.tags}"
    
    dynamic "pool" {
        for_each = var.pools
        content { 

            type = pool.value["type"]
            count = pool.value["count"]

            autoscaler {
              min = 1
              max = 2
            }
        }
    }

    lifecycle {
        ignore_changes = [
            pool.0.count
        ]
    }
}

resource "linode_nodebalancer" "gras-nodebalancer" {
    label                = "gras-nodebalancer"
    region               = "${var.region}"
}