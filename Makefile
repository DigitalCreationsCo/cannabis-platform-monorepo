docker-build:
	docker build -t grasadmin/$(CONTEXT) -f Dockerfile.$(TYPE) --build-arg=BUILD_CONTEXT=$(CONTEXT) --build-arg=PORT=$(PORT) .

docker-build-nocache:
	docker build -t grasadmin/$(CONTEXT) -f Dockerfile.$(TYPE) --build-arg=BUILD_CONTEXT=$(CONTEXT) --build-arg=PORT=$(PORT) --no-cache .
	
docker-build-debug:
	docker build -t grasadmin/$(CONTEXT) -f Dockerfile.$(TYPE) --build-arg=BUILD_CONTEXT=$(CONTEXT) --build-arg=PORT=$(PORT) --progress=plain .

docker-tag:
	docker tag $(IMAGE) grasadmin/$(IMAGE):$(TAG)

docker-push:
	docker push grasadmin/$(IMAGE):$(TAG)

create-docker-secret:
	scripts/docker/create_docker_secret.sh
	
init:
	terraform -chdir=./terraform init --backend-config=backend

plan:
	terraform -chdir=./terraform plan

apply:
	terraform -chdir=./terraform apply

console:
	terraform -chdir=./terraform console

gras-nginx-ip:
	kubectl get service gras-nginx-service -0 "jsonpath={.status.loadBalancer.ingress[0].ip}"

get-deployment-env: 
	kubectl get deployments $(DEPLOYMENT) -o jsonpath='{range.spec.template.spec.containers[*].env[*]}{@.name}{"="}{@.value}{"\n"}{end}'

get-pod-env:
	kubectl get deployments $(DEPLOYMENT) -o jsonpath='{range .spec.template.spec.containers[?(@.name=="$(POD)")].env[*]}{@.name}{"="}{@.value}{"\n"}{end}'