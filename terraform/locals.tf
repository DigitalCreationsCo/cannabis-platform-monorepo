locals {
    # Root directory of the project
    root_dir = "${dirname(abspath(path.root))}"
    ssl_cert = "${local.root_dir}/certs/ca.crt"
    ssl_key = "${local.root_dir}/certs/private.key"
    # Path to the kubeconfig directory
    # k8s_config_dir = "${local.root_dir}/.kube/"
    # Path to the kubeconfig file
    # k8s_config_file = "${local.root_dir}/.kube/kubeconfig.yaml"
}
