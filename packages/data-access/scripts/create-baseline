echo " generating migration baseline from dev database "

mkdir -p prisma/migrations/0_init
npx prisma migrate diff \
--from-empty \
--to-schema-datasource prisma/schema.prisma \
--script > prisma/migrations/0_init/migration.sql
echo " migration baseline generated at prisma/migrations/0_init/migration.sql "