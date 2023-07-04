locals {
    # Root directory of the project
    root_dir = "${dirname(abspath(path.root))}"

    ca_certificate = file("${local.root_dir}/ca.crt")
    ca_key = file("${local.root_dir}/ca.key")
    
    # Path to the kubeconfig directory
    k8s_config_dir = "${local.root_dir}/.kube/"
    # Path to the kubeconfig file
    k8s_config_file = "${local.root_dir}/.kube/kubeconfig.yaml"


    issuer_linkerd_identity = file("${local.root_dir}/terraform/yaml/issuer.linkerd-identity.yaml")
    certificate_linkerd_identity = file("${local.root_dir}/terraform/yaml/certificate.linkerd-identity.yaml")

    domain = "grascannabis.org"
}
