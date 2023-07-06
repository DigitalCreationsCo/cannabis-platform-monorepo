terraform {
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "4.5.0"
        }

        google-beta = {
            source = "hashicorp/google-beta"
            version = "4.5.0"
        }

        local = {
            source = "hashicorp/local"
            version = "2.4.0"
        }
    }

    # backend "gcs" {
    #     bucket = "tf-state"
    #     prefix = "terraform/prod"
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