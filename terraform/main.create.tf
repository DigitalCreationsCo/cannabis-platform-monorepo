
# see this guide before upgrading helm charts
# https://linkerd.io/2.13/tasks/install-helm/#upgrading-with-helm

terraform {
    required_version = ">= 0.15"
    required_providers {
        linode = {
            source  = "linode/linode"
            version = "2.5.1"
        }
    }

    backend "s3" {}
}

provider "linode" {
    token = var.linode_api_token
}