# terraform declaration
# required version
# required providers
# backend configuration

# provider configuration (linode) uses declared token variable

terraform {
    required_version = ">= 0.15"
    required_providers {
        linode = {
            source = "linode/linode"
        }
    }
    # saves backend terraform state to s3 bucket
    backend "s3" {}
}

provider "linode" {
    token = var.linode_api_token
}