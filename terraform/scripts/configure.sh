# exit on error
set -e

yarn permit-scripts

echo 'installing cert-manager resources..'
terraform/scripts/cert-manager.sh

echo 'installing linkerd resources..'
terraform/scripts/linkerd.sh

echo 'creating configuration plan..'
terraform -chdir='./terraform' plan -out='terraform.tfplan'

echo 'applying configuration plan..'
terraform -chdir='./terraform' apply 'terraform.tfplan'