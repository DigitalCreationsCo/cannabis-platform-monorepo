#!/bin/sh

#  Local development image for supertokens
docker run \
	--name supertokens \
	-p 3567:3567 \
	-e POSTGRESQL_USER=postgres.runhqicnmxfwlzwllswi \
	-e POSTGRESQL_PASSWORD=RRJV@y_CK-jz9rj \
	-e POSTGRESQL_HOST=aws-0-us-west-1.pooler.supabase.com \
	-e POSTGRESQL_PORT=5432 \
	-e POSTGRESQL_DATABASE_NAME=postgres \
	-d registry.supertokens.io/supertokens/supertokens-postgresql:7.0