Cannabis Delivery Monorepo

###
APPS

SHOP
THIS APP IS CONFIGURED WITH NEXTJS MULTIZONE CONFIGURATION.
THE BASE APP IS @CD/SHOP, IS THE SHOPPING MARKETPLACE APP. THIS IS AVAILABLE AT BASEURL.

DASHBOARD
THE VENDOR DASHBOARD APP IS @CD/DASHBOARD. THIS IS AVAILABLE AT APP.{BASEURL}

###
SERVERS

MAIN
SERVER-MAIN IS RESPONSIBLE FOR AUTHENTICATION SESSIONS, AND QUERY FOR ENTITY DATA ( USER , DRIVER, ORGANIZATION ,VENDOR, ECOMMERCE ). IT USES SUPERTOKENS LIBRARY FOR AUTHENTICATION AND SESSIONING. JWT TOKEN PERMISSIONS ARE NOT CURRENTLY BUILT.

SERVER-LOCATION
LOCATION SERVER IS RESPONSIBLE FOR GEOSPATIAL QUERIES. IT USES MONGODB SERVER TO QUERY GEOJSON DATA, AND RELAYS TO MAIN SERVER. 

###
TERRAFORM
Terraform is used for k8s cluster creation and configuration of cluster-config related resources (secrets, certificates, cert-manager)
All other k8s resources are defined in k8s/ directory

1. Add backend file 
`
skip_credentials_validation=true
skip_region_validation=true
bucket="(storage bucket)"
key="(file key)"
region="(s3 region)"
endpoint="(cloud endpoint)"
access_key="(storage access key)"
secret_key="(storage secret key)"
`

2. Add terraform.tfvars file
`
linode_api_token=""
access_key="(storage access key)"
secret_key="(storage secret key)"
`

3. create k8s cluster, run yarn:devops-create
then,                  run yarn:devops-configure

* vscode workspace uses TF_DATA_DIR to harmonize module state

# TO DO
Add a linode config file to reference static Ip / host

###
HELM 
helm is used almost exclusively as helm_release in terraform module
# see this guide before upgrading helm charts
# https://linkerd.io/2.13/tasks/install-helm/#upgrading-with-helm