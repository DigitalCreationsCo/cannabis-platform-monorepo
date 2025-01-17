#!/bin/bash

# Get the current working directory
targetDir=$(pwd)
echo "\n"
echo "Target directory: $targetDir"

# Define source paths relative to the script location
scriptDir=$(dirname "$0")

assetSrcDir=${scriptDir}/../shared
configFileSrc="$assetSrcDir/tailwind.shared.config.cjs"
echo "\n"
echo "Config file source directory: $configFileSrc"
cssSrcDir="$assetSrcDir/css"
echo "\n"
echo "CSS source directory: $cssSrcDir"
fontsSrcDir="$assetSrcDir/fonts"
echo "\n"
echo "Fonts source directory: $fontsSrcDir"

# Define destination paths relative to the current working directory
cssDestDir="$targetDir/styles"
fontsDestDir="$targetDir/public/fonts"

# Ensure destination directories exist
mkdir -p "$fontsDestDir"
mkdir -p "$cssDestDir"

# Copy assets
cp "$configFileSrc" "$targetDir/"
echo "\n"
echo "$configFileSrc copied successfully to $targetDir"

# Copy CSS files
cp -r "$cssSrcDir/"* "$cssDestDir/"
echo "\n"
echo "CSS files copied successfully to $cssDestDir"

# Copy Font files
cp -r "$fontsSrcDir/"* "$fontsDestDir/"
echo "\n"
echo "Font files copied successfully to $fontsDestDir"

# Exit with success
echo "Assets copied successfully"
exit 0
