#  Local development image for database migration

docker run --name prisma-shadow-db-pg -e POSTGRES_PASSWORD=shadowdbrocks -p 5432:5432 -d postgres