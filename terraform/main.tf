terraform {
    required_version = ">= 0.15"
    required_providers {
        linode = {
            source = "linode/linode"
            version = "2.5.1"
        }

        local = {
            source = "hashicorp/local"
            version = "2.4.0"
        }
    }

    backend "s3" {}
}


provider "linode" {
    token = var.linode_api_token
}
