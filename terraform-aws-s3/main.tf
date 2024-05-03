terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"

    }

    local = {
      source = "hashicorp/local"
      version = "2.4.0"
    }
  }

  backend "s3" {
    bucket = "f5d8da031790bc54-tf-state"
    key    = "state"
    region = "us-east-1"
  }
}

provider "aws" {
    region                   = "us-east-1"
}

locals {
    root_dir = "${dirname(abspath(path.root))}"
    ssl_cert = "${local.root_dir}/terraform/certs/fullchain.pem"
    ssl_key = "${local.root_dir}/terraform/certs/privkey.pem"
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}


resource "aws_s3_bucket" "tf_state" {
  bucket = "${random_id.bucket_prefix.hex}-tf-state"

}

resource "aws_s3_bucket" "id_verify" {
  bucket          = "${random_id.bucket_prefix.hex}-id-verify"

}

resource "aws_s3_bucket" "image_dispensary" {
  bucket          = "${random_id.bucket_prefix.hex}-image-dispensary"

}

resource "aws_s3_bucket_ownership_controls" "image_dispensary" {
  bucket = aws_s3_bucket.image_dispensary.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "image_dispensary" {
  bucket = aws_s3_bucket.image_dispensary.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "image_dispensary" {
  depends_on = [
    aws_s3_bucket_ownership_controls.image_dispensary,
    aws_s3_bucket_public_access_block.image_dispensary,
  ]

  bucket = aws_s3_bucket.image_dispensary.id
  acl    = "public-read"
}

resource "aws_s3_object" "provision_source_files" {
  depends_on = [
    aws_s3_bucket_acl.image_dispensary
  ]

    bucket  = aws_s3_bucket.image_dispensary.id
    
    for_each = fileset("${local.root_dir}/static/assets/images/dispenary/", "**/*.*") 
    
    key    = each.value
    source = "${local.root_dir}/static/assets/images/dispenary/${each.value}"
    content_type = each.value
}