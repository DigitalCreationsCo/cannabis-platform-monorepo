script/tf/cert-manager.sh
scripts/tf/linkerd.sh

terraform -chdir='./terraform' apply -state="../terraform.tfstate"