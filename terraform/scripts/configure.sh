echo 'installing cert-manager resources..'
./cert-manager.sh

echo 'installing linkerd resources..'
./linkerd.sh

echo 'creating configuration plan..'
terraform -chdir='./terraform' plan -out='terraform.tfplan'

echo 'applying configuration plan..'
terraform -chdir='./terraform' apply 'terraform.tfplan'