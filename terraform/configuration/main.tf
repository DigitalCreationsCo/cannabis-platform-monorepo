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
    # backend "s3" {}
}