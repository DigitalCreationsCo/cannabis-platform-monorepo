variable "linode_api_token" {
    description = "Your Linode API Personal Access Token. (required)"
    sensitive   = true
}

variable "k8s_version" {
    description = "The kubernetes version to use for this cluster. (required)"
    default = "1.25"
}

variable "k8s_label" {
    description = "The unique label to assign for this cluster. (required)"
    default = "tf-k8s-cluster"
}

variable "k8s_region" {
    description = "The region where your cluster will be located. (required)"
    default = "us-east"
}

variable "tags" {
    description = "Tags to apply to your cluster for organizational purposes. "
    type = list(string)
    default = ["terraform-k8s-cluster"]
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
            count = 3
        }
    ]
}