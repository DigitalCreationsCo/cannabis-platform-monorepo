locals {
    # Root directory of the project
    root_dir = "${dirname(abspath(path.root))}"
    # Path to the kubeconfig directory
    k8s_config_dir = "${local.root_dir}/.kube/"
    # Path to the kubeconfig file
    k8s_config_file = "${local.root_dir}/.kube/kubeconfig.yaml"

    yarn_cache_dir = "${local.root_dir}/.yarn/cache/"
}
