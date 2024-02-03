IMAGE=$1
TAG=$2
PORT=$3

echo $IMAGE
echo $TAG
echo $PORT

docker build -t grasadmin/$IMAGE:$TAG -f Dockerfile.app --build-arg=BUILD_TYPE=app --build-arg=BUILD_CONTEXT=$IMAGE --build-arg=PORT=$PORT . \
&& docker push grasadmin/$IMAGE:$TAG \
&& kubectl set image deployment/gras-$IMAGE gras-$IMAGE=grasadmin/$IMAGE:$TAG
