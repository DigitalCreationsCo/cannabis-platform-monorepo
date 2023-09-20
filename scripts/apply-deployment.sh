#!/bin/bash

echo " applying deployments in /${1}"
# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <directory_or_file>"
  exit 1
fi


# Check if the first argument is a directory
if [ -d "$1" ]; then
  directory="$1"
  # Iterate through files in the directory
  for filepath in "$directory"/*; do
    if [ -f "$filepath" ]; then
        file="${filepath##*/}"
        modified_file="modified-${file}"
        TAG=${TAG:-latest}
        echo " applying ${modified_file} with tag:${TAG}"
        sed -e "s|TAG|$TAG|g" "${directory}/${file}" > "${directory}/${modified_file}"
        kubectl apply -f "${directory}/${modified_file}"
        echo " removing ${modified_file}"
        rm "${directory}/${modified_file}"
      echo "Script completed on file: $file"
    fi
  done
elif [ -f "$1" ]; then
    directory="$( cd "$( dirname "$1" )" && pwd )"
    # If the argument is a file, run the script on that file
    file="${1##*/}"
    modified_file="modified-${file}"
    echo " applying ${modified_file} with tag:${TAG}"
    sed -e "s|TAG|$TAG|g" "${directory}/${file}" > "${directory}/${modified_file}"
    kubectl apply -f "${directory}/${modified_file}"
    echo " removing ${modified_file}"
    rm "${directory}/${modified_file}"
else
  echo "Invalid argument: $1 is neither a directory nor a file."
  exit 1
fi
sleep 2
echo "done"