terraform {
    required_version = ">= 0.15"
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "4.72.0"
        }

        local = {
            source = "hashicorp/local"
            version = "2.4.0"
        }
    }

    backend "gsc" {}
}


provider "google" {
  project     = "gras-cannabis"
  region      = var.region
  zone        = var.zone
  credentials = local.credentials
}