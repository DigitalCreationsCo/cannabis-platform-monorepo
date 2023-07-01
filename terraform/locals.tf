locals {
    # Root directory of the project
    root_dir = "${dirname(abspath(path.root))}"

    ca_certificate = "${local.root_dir}/ca.crt"
    issuer_certificate = "${local.root_dir}/issuer.crt"
    issuer_key = "${local.root_dir}/issuer.key"
    
    # Path to the kubeconfig directory
    k8s_config_dir = "${local.root_dir}/.kube/"
    # Path to the kubeconfig file
    k8s_config_file = "${local.root_dir}/.kube/kubeconfig.yaml"
}
