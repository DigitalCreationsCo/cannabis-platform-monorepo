resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "tf_state" {
  name          = "${random_id.bucket_prefix.hex}-bucket-${var.tf_state}"
  force_destroy = true
  location      = var.region
  storage_class = "REGIONAL"
  project = var.project_id

  versioning {
    enabled = true
  }
}