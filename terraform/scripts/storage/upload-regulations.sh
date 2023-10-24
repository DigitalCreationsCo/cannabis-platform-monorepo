#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <directory_or_file>"
  exit 1
fi

# Set the name of your Google Cloud Storage bucket
BUCKET_NAME="$1"

# Set the path to the parent directory containing the folders you want to upload
REGULATIONS_DIR="$(git rev-parse --show-toplevel)/regulations"
echo "Uploading regulations directory: $REGULATIONS_DIR to bucket: $BUCKET_NAME"

# Loop through each subdirectory in the parent directory
for DIR in "$REGULATIONS_DIR"/*/
do
    # Get the name of the subdirectory (without the trailing slash)
    DIR_NAME=${DIR%*/}
    DIR_NAME=${DIR_NAME##*/}

    # Upload the contents of the subdirectory to the bucket
    echo "upload directory $DIR_NAME"
    gsutil -m cp -r "$DIR" gs://"$BUCKET_NAME"/"$DIR_NAME"
done
echo "Done"