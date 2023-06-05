TYPE=$0 CONTEXT=$1 make docker-build-debug

IMAGE=$0-$1 make docker-tag

IMAGE=$0-$1 make docker-push