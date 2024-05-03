#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <directory_or_file>"
  exit 1
fi

# Set the name of the destination cloud storage bucket
BUCKET_NAME="$1"

# Set the path to the parent directory containing the folders you want to upload
DISPENSARY_IMAGES_DIRECTORY="$(git rev-parse --show-toplevel)/static/assets/images/dispensary"

echo "Dispensary Images Directory: $DISPENSARY_IMAGES_DIRECTORY"
echo "Uploading dispensary images to bucket: $BUCKET_NAME"

# Loop through each subdirectory in the parent directory
for DIR in "$DISPENSARY_IMAGES_DIRECTORY"/*/
do
    # Get the name of the subdirectory (without the trailing slash)
    DIR_NAME=${DIR%*/}
    DIR_NAME=${DIR_NAME##*/}
    
    # Upload the contents of the subdirectory to the bucket
    echo "upload directory $DIR_NAME"
    gsutil -m cp -r "$DIR" gs://"$BUCKET_NAME"/"$DIR_NAME"
done
echo "Done"