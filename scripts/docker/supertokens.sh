docker run \
 -p 3567:3567 \
 --network=bridge \
 -v /etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt \
 -e MYSQL_CONNECTION_URI="mysql://hjl13pett5q5hdb0b6vs:pscale_pw_Dl9qggUnN02NIVAWDXa19Rsrcv8yCELmjNw1jSaMdb3@aws.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=accept_invalid_certs	" \
 -d registry.supertokens.io/supertokens/supertokens-mysql

# docker run \
#  -p 3567:3567 \
#  --network=bridge \
#  -v /etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt \
#  -e MYSQL_CONNECTION_URI="mysql://hjl13pett5q5hdb0b6vs:pscale_pw_Dl9qggUnN02NIVAWDXa19Rsrcv8yCELmjNw1jSaMdb3@aws.connect.psdb.cloud:3306/cannabis_delivery_v1?sslcert=/etc/ssl/certs/ca-certificates.crt&sslaccept=accept_invalid_certs	" \
#  -d registry.supertokens.io/supertokens/supertokens-mysql
