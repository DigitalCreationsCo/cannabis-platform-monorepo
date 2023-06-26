terraform {
    required_version = ">= 0.15"
    required_providers {
        linode = {
            source = "linode/linode"
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

provider "helm" {
    kubernetes {
        config_path = local.k8s_config_file
    }
}