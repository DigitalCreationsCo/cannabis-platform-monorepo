docker-build:
	docker build -t grasadmin/$(BUILD_CONTEXT):$(TAG) -f Dockerfile.$(BUILD_TYPE) --build-arg=BUILD_TYPE=$(BUILD_TYPE) --build-arg=BUILD_CONTEXT=$(BUILD_CONTEXT) --build-arg=PORT=$(PORT) .

docker-build-nocache:
	docker build -t grasadmin/$(BUILD_CONTEXT):$(TAG) -f Dockerfile.$(BUILD_TYPE) --build-arg=BUILD_TYPE=$(BUILD_TYPE) --build-arg=BUILD_CONTEXT=$(BUILD_CONTEXT) --build-arg=PORT=$(PORT) --no-cache .
	
docker-build-nocache-output:
	docker build -t grasadmin/$(BUILD_CONTEXT):$(TAG) -f Dockerfile.$(BUILD_TYPE) --build-arg=BUILD_TYPE=$(BUILD_TYPE) --build-arg=BUILD_CONTEXT=$(BUILD_CONTEXT) --build-arg=PORT=$(PORT) --no-cache . 2>&1 | tee build.log
	
docker-build-debug:
	docker build -t grasadmin/$(BUILD_CONTEXT):$(TAG) -f Dockerfile.$(BUILD_TYPE) --build-arg=BUILD_TYPE=$(BUILD_TYPE) --build-arg=BUILD_CONTEXT=$(BUILD_CONTEXT) --build-arg=PORT=$(PORT) --progress=plain .

docker-build-supertokens:
	docker build -t grasadmin/supertokens:3.14 -f Dockerfile.supertokens .

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

destroy:
	terraform -chdir=./terraform destroy

console:
	terraform -chdir=./terraform console

gras-nginx-ip:
	kubectl get service gras-nginx-service -0 "jsonpath={.status.loadBalancer.ingress[0].ip}"

get-deployment-env: 
	kubectl get deployments $(DEPLOYMENT) -o jsonpath='{range.spec.template.spec.containers[*].env[*]}{@.name}{"="}{@.value}{"\n"}{end}'

get-pod-env:
	kubectl get deployments $(DEPLOYMENT) -o jsonpath='{range .spec.template.spec.containers[?(@.name=="$(POD)")].env[*]}{@.name}{"="}{@.value}{"\n"}{end}'
