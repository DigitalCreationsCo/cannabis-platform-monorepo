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

        kubernetes = {
            source = "hashicorp/kubernetes"
            version = "2.21.1"
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

provider "kubernetes" {
  host  = "https://${google_container_cluster.gras_cluster.endpoint}"
  token = data.google_client_config.provider.access_token
  cluster_ca_certificate = base64decode(
    data.google_container_cluster.gras_cluster.master_auth[0].cluster_ca_certificate,
  )
}

resource "kubernetes_secret" "ssl_secret" {
  metadata {
    name = "ssl-certificate"
  }

  data = {
    tls.crt = file(local.ssl_cert)
  }

  type = "kubernetes.io/tls"
}

resource "google_compute_network" "gras-network" {
  name                    = var.network_name
  auto_create_subnetworks = "false"
  project = var.project_id
  # Everything in this solution is deployed regionally
  routing_mode = "REGIONAL"
}
