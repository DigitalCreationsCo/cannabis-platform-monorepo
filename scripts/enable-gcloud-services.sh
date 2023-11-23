#!/bin/bash
echo "Enabling GCP services"

echo "Enabling compute.googleapis.com"
gcloud services enable compute.googleapis.com

echo "Enabling container.googleapis.com"
gcloud services enable container.googleapis.com

echo "Waiting 60s for changes to propogate.."
sleep 60
echo "Done waiting"