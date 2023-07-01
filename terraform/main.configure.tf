terraform {
    required_version = ">= 0.15"
    required_providers {
        linode = {
            source  = "linode/linode"
            version = "2.5.1"
        }

        kubernetes = {
            source = "hashicorp/kubernetes"
            version = "2.21.1"
        }

        helm = {
            source = "hashicorp/helm"
            version = "2.10.1"
        }
    }

    backend "s3" {}
}

provider "linode" {
    token = var.linode_api_token
}

provider "kubernetes" {
    config_path = local.k8s_config_file
    cluster_ca_certificate = local.ca_certificate

    # ensure the Kubernetes provider is receiving valid credentials, an exec-based plugin can be used to fetch a new token before initializing the provider
    # exec {
    #     api_version = "client.authentication.k8s.io/v1beta1"
    #     args        = ["eks", "get-token", "--cluster-name", var.cluster_name]
    #     command     = "aws"
    # }
}

provider "helm" {
    kubernetes {
        config_path = local.k8s_config_file
    }
}