echo "### Migration Diff ###"
echo "creating a migration diff for production database.."

# npx prisma migrate diff \
# --from-schema-datasource "prisma/schema.prisma" \
# --to-schema-datamodel "prisma/schema.prisma"

npx prisma migrate diff \
--from-url "$DATABASE_URL" \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/forward.sql
echo "generated prisma/forward.sql"

# echo "executing prisma/forward.sql"
# npx prisma db execute --url "$DATABASE_URL" --file prisma/forward.sql
# echo "done"