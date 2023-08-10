baseline:
	@sleep 1
	@mkdir -p prisma/migrations/0_init
	@echo " generating migration baseline from dev database "
	@yarn dotenv -e ../../.env.production -- \
	npx prisma migrate diff \
	--from-empty \
	--to-schema-datasource prisma/schema.prisma \
	--script > prisma/migrations/0_init/migration.sql
	@sleep 1
	@echo ""
	@echo " migration baseline generated at prisma/migrations/0_init/migration.sql "