#!/usr/bin/env sh
cat <<EOF
Generating packages cache hash packages-sha..
EOF
find packages -type d -exec basename {} \; | sort | sha1sum | awk '{print $1}' > .cache/checksums/packages-sha && \
git add .cache/checksums/packages-sha