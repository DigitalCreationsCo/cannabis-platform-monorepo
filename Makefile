init
	terraform -chdir=./terraform init --backend-config=backend

plan
	terraform -chdir=./terraform plan

apply
	terraform -chdir=./terraform apply

destroy
   	terraform -chdir=./terraform destroy

console
	terraform -chdir=./terraform console