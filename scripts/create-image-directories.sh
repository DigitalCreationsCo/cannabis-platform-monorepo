#!/bin/sh
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGES_DIR="$SCRIPT_DIR/../static/assets/images/dispensary"

echo "Images Directory: $IMAGES_DIR"
# Check if the directory exists
if [ ! -d "$IMAGES_DIR" ]; then
  echo "Directory not found!"
  exit 1
fi

# Traverse each image in the directory
for IMAGE in "$IMAGES_DIR"/*; do
  if [ -f "$IMAGE" ]; then  # Check if it's a file
    # Extract filename without extension
    FILENAME=$(basename -- "$IMAGE")
    FILENAME_NO_EXT="${FILENAME%.*}"

    # Create subdirectory with the image's name (if not already existing)
    mkdir -p "$IMAGES_DIR/$FILENAME_NO_EXT"

    # Move the image to its corresponding subdirectory and rename it as logo-small with original extension
    mv "$IMAGE" "$IMAGES_DIR/$FILENAME_NO_EXT/logo-small.${FILENAME##*.}"
  fi
done

echo "Images organized into subdirectories with 'logo-small' names."
