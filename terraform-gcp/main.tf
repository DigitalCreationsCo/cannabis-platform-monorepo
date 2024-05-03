terraform {
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "4.5.0"
        }
        # https://registry.terraform.io/providers/hashicorp/google/latest/docs

        google-beta = {
            source = "hashicorp/google-beta"
            version = "4.5.0"
        }
        # https://registry.terraform.io/providers/hashicorp/google-beta/latest/docs

        kubernetes = {
            source = "hashicorp/kubernetes"
            version = "2.21.1"
        }
        # https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs

        local = {
            source = "hashicorp/local"
            version = "2.4.0"
        }
        # https://registry.terraform.io/providers/hashicorp/local/latest/docs
    }

    # backend "gcs" {
      # bucket = "e4f53ea0212ea91d-bucket-tf-state"
      # prefix = "terraform/prod"
    # }
    required_version = ">= 1.0"
}

provider "google" {
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

provider "google-beta" {
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

provider "kubernetes" {
  config_path = "${local.root_dir}/.kube/kubeconfig.yaml"
}

resource "google_compute_network" "gras-network" {
  name                    = var.network_name
  auto_create_subnetworks = "false"
  project = var.project_id
  # Everything in this solution is deployed regionally
  routing_mode = "REGIONAL"
}

module "storage" {
  source = "./storage"

  project_id = var.project_id
  region     = var.region
  tf_state   = var.tf_state

}