#!/usr/bin/env sh
cat <<EOF
Generating node_modules cache hash modules-sha..
EOF
mkdir -p .cache/checksums && \
find . \
-type d -name 'node_modules' \
-prune -false -o -name '.webpack' \
-prune -false -o -type f -name 'yarn.lock' \
| sort \
| xargs shasum > .cache/checksums/modules-sha && \
git add .cache/checksums/modules-sha