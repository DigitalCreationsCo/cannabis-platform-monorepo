 docker run \
	-p 3567:3567 \
    -v ./ssl3.crt:/mnt/certs/ssl.crt \
	-e MYSQL_CONNECTION_URI="mysql://hjl13pett5q5hdb0b6vs:pscale_pw_Dl9qggUnN02NIVAWDXa19Rsrcv8yCELmjNw1jSaMdb3@aws.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict&sslcert=/mnt/certs/ssl.crt" \
	-d registry.supertokens.io/supertokens/supertokens-mysql