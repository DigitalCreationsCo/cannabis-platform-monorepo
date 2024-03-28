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

resource "google_storage_bucket" "image_id_verify" {
  name          = "${random_id.bucket_prefix.hex}-image-id-verify"
  force_destroy = false
  location      = var.region
  storage_class = "REGIONAL"
  project = var.project_id

  versioning {
    enabled = false
  }
}

resource "google_storage_bucket" "image_dispensary" {
  name          = "${random_id.bucket_prefix.hex}-image-dispensary"
  force_destroy = false
  location      = var.region
  storage_class = "REGIONAL"
  project = var.project_id

  versioning {
    enabled = false
  }
}

resource "null_resource" "upload_dispensary_images" {
  depends_on = [google_storage_bucket.image_dispensary]
  provisioner "local-exec" {
    # upload dispensary images to newly created bucket
    command = "./scripts/storage/upload-dispensary-images.sh ${google_storage_bucket.image_dispensary.name}"
  }
}

resource "google_storage_bucket" "regulations" {
  name          = "${random_id.bucket_prefix.hex}-regulations"
  force_destroy = false
  location      = var.region
  storage_class = "REGIONAL"
  project = var.project_id

  versioning {
    enabled = false
  }
}

resource "null_resource" "upload_regulations_content" {
  depends_on = [google_storage_bucket.regulations]
  provisioner "local-exec" {
    # upload regulations content to newly created bucket
    command = "./scripts/storage/upload-regulations.sh ${google_storage_bucket.regulations.name}"
  } 
}

resource "google_storage_bucket" "ml_annotations" {
  name          = "${random_id.bucket_prefix.hex}-ml-annotations"
  force_destroy = false
  location      = var.region
  storage_class = "REGIONAL"
  project = var.project_id

  versioning {
    enabled = false
  }
}

resource "null_resource" "upload_annotations" {
  depends_on = [google_storage_bucket.ml_annotations]
  provisioner "local-exec" {
    # upload regulations content to newly created bucket
    command = "./scripts/storage/upload-annotations.sh ${google_storage_bucket.ml_annotations.name}"
  }
}