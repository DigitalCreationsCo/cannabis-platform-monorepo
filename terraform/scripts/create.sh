rm -rf .terraform

terraform -chdir='./terraform' init -backend-config='backend'

echo 'creating terraform plan..' 
terraform -chdir='./terraform' plan -out='terraform.tfplan'  -target='linode_lke_cluster.gras_terraform_k8s' \
-target='local_file.k8s_config'

echo 'applying terraform plan..'
terraform -chdir='./terraform' apply 'terraform.tfplan'