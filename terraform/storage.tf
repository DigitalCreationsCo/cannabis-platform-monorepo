resource "google_storage_bucket" "tf_state" {
  name          = var.tf_state
  force_destroy = true
  location      = var.region
  storage_class = "REGIONAL"
  versioning {
    enabled = true
  }
}