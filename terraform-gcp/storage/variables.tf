variable "project_id" {
    description = "The project ID to deploy to. (required)"
}

variable "region" {
    description = "The region of tf state. "
}

variable "tf_state" {
    description = "The identifier for terraform state storage (required)"
    default = "tf-state"
}
