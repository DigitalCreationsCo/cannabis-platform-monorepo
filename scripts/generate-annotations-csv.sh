#!/bin/bash

echo "Generating annotations CSV files"
# Use find command to locate all Python scripts in ml/ComplianceRecognizer/scripts directory and its subdirectories
for script in $(find ml/ComplianceRecognizer/scripts -name "*.py"); do
    # Use python command to run each Python script
    python "$script"
done
echo "Done"
