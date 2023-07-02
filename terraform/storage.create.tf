resource "linode_object_storage_bucket" "gras-terraform-k8s" {
    label = "gras-terraform-k8s"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-terraform-k8s.access_key
    # secret_key = linode_object_storage_key.gras-terraform-k8s.secret_key
}

resource "linode_object_storage_bucket" "gras-id-verify" {
    label = "gras-id-verify"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-id-verify.access_key
    # secret_key = linode_object_storage_key.gras-id-verify.secret_key
}
resource "linode_object_storage_bucket" "gras-id-verify-dev" {
    label = "gras-id-verify-dev"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-id-verify-dev.access_key
    # secret_key = linode_object_storage_key.gras-id-verify-dev.secret_key
}
resource "linode_object_storage_bucket" "gras-profile-picture" {
    label = "gras-profile-picture"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-profile-picture.access_key
    # secret_key = linode_object_storage_key.gras-profile-picture.secret_key
}
resource "linode_object_storage_bucket" "gras-profile-picture-dev" {
    label = "gras-profile-picture-dev"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-profile-picture-dev.access_key
    # secret_key = linode_object_storage_key.gras-profile-picture-dev.secret_key
}
resource "linode_object_storage_bucket" "gras-dispensary-images" {
    label = "gras-dispensary-images"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-dispensary-images.access_key
    # secret_key = linode_object_storage_key.gras-dispensary-images.secret_key
}
resource "linode_object_storage_bucket" "gras-dispensary-images-dev" {
    label = "gras-dispensary-images-dev"

    cluster = var.cluster
    # access_key = linode_object_storage_key.gras-dispensary-images-dev.access_key
    # secret_key = linode_object_storage_key.gras-dispensary-images-dev.secret_key
}

resource "linode_object_storage_key" "gras-id-verify" {
    label = "gras-id-verify"

    bucket_access {
      bucket_name = linode_object_storage_bucket.gras-id-verify.label
      cluster = var.cluster
      permissions = "read_write"
    }
}
resource "linode_object_storage_key" "gras-id-verify-dev" {
    label = "gras-id-verify-dev"

    bucket_access {
      bucket_name = linode_object_storage_bucket.gras-id-verify-dev.label
      cluster = var.cluster
      permissions = "read_write"
    }
}
resource "linode_object_storage_key" "gras-profile-picture" {
    label = "gras-profile-picture"

    bucket_access {
      bucket_name = linode_object_storage_bucket.gras-profile-picture.label
      cluster = var.cluster
      permissions = "read_write"
    }
}
resource "linode_object_storage_key" "gras-profile-picture-dev" {
    label = "gras-profile-picture-dev"

    bucket_access {
      bucket_name = linode_object_storage_bucket.gras-profile-picture-dev.label
      cluster = var.cluster
      permissions = "read_write"
    }
}
resource "linode_object_storage_key" "gras-dispensary-images" {
    label = "gras-dispensary-images"

    bucket_access {
      bucket_name = linode_object_storage_bucket.gras-dispensary-images.label
      cluster = var.cluster
      permissions = "read_write"
    }
}
resource "linode_object_storage_key" "gras-dispensary-images-dev" {
    label = "gras-dispensary-images-dev"

    bucket_access {
      bucket_name = linode_object_storage_bucket.gras-dispensary-images-dev.label
      cluster = var.cluster
      permissions = "read_write"
    }
}
