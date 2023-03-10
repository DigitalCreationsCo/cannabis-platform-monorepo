docker run -it --shm-size=1g \
  -e PBF_URL=https://download.geofabrik.de/north-america/us-latest.osm.pbf \
  -e REPLICATION_URL=http://download.geofabrik.de/north-america/us-updates/ \
  -e IMPORT_WIKIPEDIA=false \
  -e NOMINATIM_PASSWORD=a_most_very_secure_password \
  -v nominatim-data:/var/lib/postgresql/14/main \
  -p 8080:8080 \
  --name nominatim \
  mediagis/nominatim:4.1