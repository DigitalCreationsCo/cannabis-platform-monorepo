locals {
    # Root directory of the project
    root_dir = "${dirname(abspath(path.root))}"
    ca_certificate = file("${local.root_dir}/ca.crt")
    ca_key = file("${local.root_dir}/ca.key")
    credentials = file("${local.root_dir}/gcp_service_account.json")
    # Path to the kubeconfig directory
    k8s_config_dir = "${local.root_dir}/.kube/"
    # Path to the kubeconfig file
    k8s_config_file = "${local.root_dir}/.kube/kubeconfig.yaml"
}
