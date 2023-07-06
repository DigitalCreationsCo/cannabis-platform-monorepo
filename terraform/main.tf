terraform {
    required_providers {
        google = {
            source = "hashicorp/google-beta"
            version = "4.5.0"
        }

        local = {
            source = "hashicorp/local"
            version = "2.4.0"
        }
    }

    backend "gsc" {
        bucket = "tf-state"
        prefix = "terraform/prod"
    }
    required_version = ">= 0.15"
}


provider "google-beta" {
  project     = var.project_id
  region      = var.region
  zone        = var.zone
  credentials = local.credentials
}