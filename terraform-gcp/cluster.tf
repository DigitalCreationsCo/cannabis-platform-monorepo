resource "google_compute_subnetwork" "default" {
  depends_on    = [google_compute_network.gras-network]
  name          = "${var.cluster_name}-subnet"
  project       = google_compute_network.gras-network.project
  region        = var.region
  network       = google_compute_network.gras-network.name
  ip_cidr_range = "10.0.0.0/24"
}

resource "google_container_cluster" "gras_cluster" {
  provider = google-beta
  project  = var.project_id

  name     = var.cluster_name
  location = var.region

  initial_node_count = var.num_nodes
  # More info on the VPC native cluster: https://cloud.google.com/kubernetes-engine/docs/how-to/standalone-neg#create_a-native_cluster
  networking_mode = "VPC_NATIVE"
  network         = google_compute_network.gras-network.name
  subnetwork      = google_compute_subnetwork.default.name
  # Disable the Google Cloud Logging service because you may overrun the Logging free tier allocation, and it may be expensive
  logging_service = "none"

  node_config {
    # More info on Spot VMs with GKE https://cloud.google.com/kubernetes-engine/docs/how-to/spot-vms#create_a_cluster_with_enabled
    spot = var.spot
    machine_type = var.machine_type
    disk_size_gb = var.disk_size
    tags = var.tags
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/trace.append",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/servicecontrol",
    ]
  }

  addons_config {
    http_load_balancing {
      # This needs to be enabled for the NEG to be automatically created for the ingress gateway svc
      disabled = false
    }
  }

  private_cluster_config {
    # Need to use private nodes for VPC-native GKE clusters
    enable_private_nodes = true
    # Allow private cluster Master to be accessible outside of the network
    enable_private_endpoint = false
    master_ipv4_cidr_block = "172.16.0.16/28"
  }

  ip_allocation_policy {
    cluster_ipv4_cidr_block = "5.0.0.0/16"
    services_ipv4_cidr_block = "5.1.0.0/16"
  }

  default_snat_status {
    # More info on why sNAT needs to be disabled: https://cloud.google.com/kubernetes-engine/docs/how-to/alias-ips#enable_pupis
    # This applies to VPC-native GKE clusters
    disabled = true
  }

  # ! vulnerability here - need to address this for production
  master_authorized_networks_config {
    cidr_blocks {
      # Because this is a private cluster, need to open access to the Master nodes in order to connect with kubectl
      cidr_block = "0.0.0.0/0"
      display_name = "World"
    }
  }
}

resource "time_sleep" "wait_for_kube" {
  depends_on = [google_container_cluster.gras_cluster]
  # GKE master endpoint may not be immediately accessible, resulting in error, waiting does the trick
  create_duration = "30s"
}

resource "null_resource" "local_k8s_context" {
  depends_on = [time_sleep.wait_for_kube]
  provisioner "local-exec" {
    # Update your local gcloud and kubectl credentials for the newly created cluster
    command = "for i in 1 2 3 4 5; do gcloud container clusters get-credentials ${var.cluster_name} --project=${var.project_id} --location=${var.region} && break || sleep 60; done"
  }
}

# resource "kubernetes_namespace" "redis" {
#   depends_on = [google_container_cluster.gras_cluster]

#   metadata {
#     annotations = {
#       name = "redis"
#     }

#     labels = {
#       mylabel = "redis"
#     }

#     name = "redis"
#   }
# }
