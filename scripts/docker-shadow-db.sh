#  Local development image for database migration

docker run --name shadow-db-pg -e POSTGRES_PASSWORD=shadowdbrocks -d postgres