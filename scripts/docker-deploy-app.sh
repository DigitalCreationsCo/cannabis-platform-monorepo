IMAGE=$1
TAG=$2
PORT=$3

echo $IMAGE
echo $TAG
echo $PORT
echo 'docker build --cache-from=grasadmin/node_modules:${TAG} -t grasadmin/$IMAGE:$TAG -f Dockerfile.app.local --build-arg=BUILD_TYPE=app --build-arg=BUILD_CONTEXT=$IMAGE --build-arg=PORT=$PORT --no-cache .'

docker build --cache-from=grasadmin/node_modules:${TAG} -t grasadmin/$IMAGE:$TAG -f Dockerfile.app.local --build-arg=BUILD_TYPE=app --build-arg=BUILD_CONTEXT=$IMAGE --build-arg=PORT=$PORT --no-cache . \
&& docker push grasadmin/$IMAGE:$TAG \
&& kubectl set image deployment/gras-$IMAGE gras-$IMAGE=grasadmin/$IMAGE:$TAG
