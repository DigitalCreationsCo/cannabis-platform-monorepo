resource "local_file" "k8s_config" {
    content = "Actual data coming soon"
    filename = "${local.k8s_config_file}"
    file_permission = "0600"
}
