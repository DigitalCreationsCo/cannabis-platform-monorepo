#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <directory_or_file>"
  exit 1
fi

ROOT_DIR="$(git rev-parse --show-toplevel)"

# Generate annotations CSV files
$ROOT_DIR/scripts/generate-annotations-csv.sh

# Set the name of your Google Cloud Storage bucket
BUCKET_NAME="$1"

# Set the path to the parent directory containing the folders you want to upload
ANNOTATIONS_DIR="$(git rev-parse --show-toplevel)/ml/ComplianceRecognizer/annotations"
echo "Annotations Directory: $ANNOTATIONS_DIR"
echo "Uploading annotations to bucket: $BUCKET_NAME"

# Loop through each subdirectory in the parent directory
for DIR in "$ANNOTATIONS_DIR"/*/
do
    # Get the name of the subdirectory (without the trailing slash)
    DIR_NAME=${DIR%*/}
    DIR_NAME=${DIR_NAME##*/}
    
    # Upload the contents of the subdirectory to the bucket
    echo "upload directory $DIR_NAME"
    gsutil -m cp -r "$DIR" gs://"$BUCKET_NAME"/"$DIR_NAME"
done
echo "Done"