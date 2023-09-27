#!/bin/bash

# args
# $1: directory or file
# $2: script to run for directory or file

# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <directory_or_file> <script_to_run>"
  exit 1
fi

# Check if the first argument is a directory
if [ -d "$1" ]; then
  directory="$1"
  script_to_run="$2"

  # Iterate through files in the directory
  for file in "$directory"/*; do
    if [ -f "$file" ]; then
      echo "Running script on file: $file"
      # Pass the file as an argument to the script
      "$script_to_run" "$file"
    fi
  done
elif [ -f "$1" ]; then
  # If the argument is a file, pass it to a different script
  script_to_run="$2"
  file="$1"
  echo "Passing file to script: $file"
  "$script_to_run" "$file"
else
  echo "Invalid argument: $1 is neither a directory nor a file."
  exit 1
fi
