if [ -z "$1" ]; then
    echo "No deployment supplied"
    exit 1
fi

dir="$( cd "$( dirname "$1" )" && pwd )"
deployment_file="${1##*/}"
modified_deployment_file="modified-${deployment_file}"
TAG=${TAG:-latest}

echo "TAG is ${TAG}"
# Replace the placeholder tag value
sed -e "s|TAG|$TAG|g" "${dir}/${deployment_file}" > "${dir}/${modified_deployment_file}"

# Apply the modified configuration using kubectl
echo "Applying ${modified_deployment_file} with tag:${TAG}"
kubectl apply -f "${dir}/${modified_deployment_file}"

# remove the temporary file
rm "${dir}/${modified_deployment_file}"