terraform {
    required_version = ">= 0.15"
    required_providers {
        linode = {
            source = "linode/linode"
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
}

provider "helm" {
    kubernetes {
        config_path = local.k8s_config_file
    }
}