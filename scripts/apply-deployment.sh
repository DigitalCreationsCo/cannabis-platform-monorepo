if [ -z "$1" ]; then
    echo "No deployment supplied"
    exit 1
fi

TAG=${TAG:-latest}

deployment_file=$1
modified_deployment_file=modified-${deployment_file}

# Replace the placeholder tag value
sed -e "s|TAG|$TAG|g" "${deployment_file}" > ${modified_deployment_file}

# Apply the modified configuration using kubectl
kubectl apply -f modified-test-deploy.yaml

# remove the temporary file
rm modified-test-deploy.yaml