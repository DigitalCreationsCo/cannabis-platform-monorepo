#!/bin/sh

# Check if a directory is provided as an argument
if [ $# -ne 1 ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

directory_path=$1

# Check if the provided directory exists
if [ ! -d "$directory_path" ]; then
  echo "Directory '$directory_path' does not exist."
  exit 1
fi

# Perform 'git checkout --ours' for each file in the specified directory and its subdirectories
find "$directory_path" -type f -print0 | while IFS= read -r -d '' file; do
  echo "Checking out '$file'"
  git checkout --ours -- "$file"
done

echo "Completed 'git checkout --ours' for files in '$directory_path' and its subdirectories."
