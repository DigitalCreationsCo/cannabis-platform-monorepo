echo "### Migration Revert ###"
echo "Migrate a failed migration database back to the history state."
echo "creating a migration diff from the migration history."

npx prisma migrate diff \
--from-url "${DATABASE_URL}" \
--to-migrations ./prisma/migrations \
--shadow-database-url="${SHADOW_DATABASE_URL}" \
--script > prisma/revert.sql
echo "generated prisma/revert.sql"

echo "executing prisma/revert.sql"
npx prisma db execute --url "${DATABASE_URL}" --file prisma/revert.sql
echo "done"