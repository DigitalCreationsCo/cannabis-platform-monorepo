if [ -z "$APPLY_FILE" ]; then
    echo "No deployment file supplied"
    exit 1
fi

dir="$( cd "$( dirname "$APPLY_FILE" )" && pwd )"
deployment_file="${APPLY_FILE##*/}"
echo " input file: $deployment_file"
modified_deployment_file="modified-${deployment_file}"
TAG=${TAG:-latest}

echo " tag is ${TAG}"
# Replace the placeholder tag value
sed -e "s|TAG|$TAG|g" "${dir}/${deployment_file}" > "${dir}/${modified_deployment_file}"

# Apply the modified configuration using kubectl
echo " applying ${modified_deployment_file} with tag:${TAG}"
kubectl apply -f "${dir}/${modified_deployment_file}"

# remove the temporary file
echo " removing ${modified_deployment_file}"
rm "${dir}/${modified_deployment_file}"
echo " done"