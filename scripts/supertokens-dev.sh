#  Local development image for supertokens
docker run \
	-p 3567:3567 \
	-e POSTGRESQL_USER=postgres \
	-e POSTGRESQL_PASSWORD=RRJV@y_CK-jz9rj \
	-e POSTGRESQL_HOST=db.runhqicnmxfwlzwllswi.supabase.co \
	-e POSTGRESQL_PORT=6543 \
	-e POSTGRESQL_DATABASE_NAME=postgres \
	-e POSTGRESQL_CONNECTION_URI="postgres://postgres:RRJV@y_CK-jz9rj@db.runhqicnmxfwlzwllswi.supabase.co:6543/postgres?pgbouncer=true&connection_limit=30" \
	-d registry.supertokens.io/supertokens/supertokens-postgresql:7.0