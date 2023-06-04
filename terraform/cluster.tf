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

# resource yarn_cache saved in linode s3 bucket

# resource "linode_object_storage_object" "k8s_yarn_cache" {
#     key     = "k8s_yarn_cache"
#     cluster="us-southeast-1"
#     bucket = "${var.s3_bucket}"
#     # region = "us-southeast-1"
#     source = "${local.yarn_cache_dir}"

#     access_key = "${var.access_key}"
#     secret_key = "${var.secret_key}"
# }