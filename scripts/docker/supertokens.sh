#  Local development image for supertokens
docker run \
	-p 3567:3567 \
	-e MYSQL_CONNECTION_URI="postgresql://postgres:RRJV@y_CK-jz9rj@db.runhqicnmxfwlzwllswi.supabase.co:5432/postgres" \
	-d registry.supertokens.io/supertokens/supertokens-mysql