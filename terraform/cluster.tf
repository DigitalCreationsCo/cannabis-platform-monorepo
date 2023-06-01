# resource 'local_file' from terraform, named 'k8s_config'
resource "local_file" "k8s_config" {
    content = "${nonsensitive(base64decode(linode_lke_cluster.terraform_k8s.kubeconfig))}"
    filename = "${local.k8s_config_file}"
    file_permission = "0600"
}

# resource 'linode_lke_cluster' from linode provider, named 'terraform_k8s'
resource "linode_lke_cluster" "terraform_k8s" {
    k8s_version = "${var.k8s_version}"
    label="${var.k8s_label}"
    region="${var.k8s_region}"
    tags="${var.tags}"
    dynamic "pool" {
        for_each = var.pools
        content { 
            type = pool.value["type"]
            count = pool.value["count"]
        }
    }
}