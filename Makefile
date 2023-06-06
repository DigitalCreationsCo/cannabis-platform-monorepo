init:
	terraform -chdir=./terraform init --backend-config=backend

plan:
	terraform -chdir=./terraform plan

apply:
	terraform -chdir=./terraform apply

destroy:
   	terraform -chdir=./terraform destroy

console:
	terraform -chdir=./terraform console

gras-nginx-ip:
	kubectl get service gras-nginx-service -0 "jsonpath={.status.loadBalancer.ingress[0].ip}"

docker-build:
	docker build -t $(TYPE)-$(CONTEXT) -f Dockerfile.$(TYPE) --build-arg=BUILD_CONTEXT=$(CONTEXT) .

docker-build-debug:
	docker build -t $(TYPE)-$(CONTEXT) -f Dockerfile.$(TYPE) --build-arg=BUILD_CONTEXT=$(CONTEXT) --progress=plain .

docker-tag:
	docker tag $(IMAGE) grasadmin/graswebgoldenimages/$(IMAGE):$(TAG)

docker-push:
	docker push grasadmin/graswebgoldenimages:$(IMAGE)

create-docker-secret:
	scripts/docker/create_docker_secret.sh