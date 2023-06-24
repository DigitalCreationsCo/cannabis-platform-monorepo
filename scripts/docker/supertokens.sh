docker run \
  --name supertokens-mysql \
  -p 3567:3567 \
  --network=bridge \
  -e MYSQL_CONNECTION_URI='mysql://4af8mcs8kg8ty8rzyapg:pscale_pw_pxpFbwk2ziXzlthQeoEMkkpr4BuWdgg1aSqBgw6zGqm@aws.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict' \
  -d registry.supertokens.io/supertokens/supertokens-mysql:latest