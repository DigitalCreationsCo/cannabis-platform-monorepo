variable "project_id" {
    description = "The project ID to deploy to. (required)"
}

variable "k8s_version" {
    description = "The kubernetes version to use for this cluster. (required)"
}

variable "cluster_name" {
    description = "The unique label to assign for this cluster. (required)"
}

variable "network_name" {
  description = "The name of the network"
}

variable "region" {
    description = "The region of tf state. "
}

variable "zone" {
    description = "the region endpoint"
}

variable "tf_state" {
    description = "The identifier for terraform state storage (required)"
    default = "tf-state"
}

variable "tags" {
    description = "Tags to apply to your cluster for organizational purposes. "
    type = list(string)
    default = ["gras-cluster", "terraform"]
}

variable "pools" {
    description = "The node pool specifications for the Kubernetes cluster. (required)"
    type = list(object({
        type = string
        count = number
    }))
    default = [
        {
            type = "g6-standard-1"
            count = 2
        }
    ]
}

variable "num_nodes" {
  description = "The number of cluster nodes"
}

variable "machine_type" {
  description = "The machine type of the cluster nodes"
}

variable "disk_size" {
  description = "The disk size of the cluster nodes"
}

variable "https" {
  description = "Whether to set up the load balancer with HTTPS or not"
}

variable "ip_address_name" {
  description = "The name of the static IP Address for the load balancer"
}

variable "ssl_cert_name" {
  description = "The name of the SSL certificate for the load balancer"
}

variable "domain_name" {
  description = "Domain name for the load balancer"
}