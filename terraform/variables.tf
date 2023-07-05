variable "k8s_version" {
    description = "The kubernetes version to use for this cluster. (required)"
    default = "1.25"
}

variable "cluster_label" {
    description = "The unique label to assign for this cluster. (required)"
    default = "gras-terraform-cluster"
}

variable "region" {
    description = "The region of tf state. "
    default = "us-east1"
}

variable "zone" {
    description = "the region endpoint"
    default = "us-east1-b"
}

variable "tf-state-prod" {
    description = "The identifier for terraform state storage (required)"
    default = "tf-state-prod"
}

variable "tags" {
    description = "Tags to apply to your cluster for organizational purposes. "
    type = list(string)
    default = ["gras-terraform-cluster", "gras"]
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