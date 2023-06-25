# supertokens dev database credentials

docker run \
 -p 3567:3567 \
 --network=bridge \
 -e MYSQL_CONNECTION_URI='mysql://i6nudrro7avfjzy15vaf:pscale_pw_xUkxaaIiN7evWAYOghNnwZ7nTvXyFKQIuzf5WFF34AW@aws.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict&sslcert=/etc/ssl/certs/ca-certificates.crt' \
 -d registry.supertokens.io/supertokens/supertokens-mysql