docker run \
  -p 3567:3567 \
  --network=bridge \
  -e MYSQL_CONNECTION_URI="mysql://5rym7hkijdnzxdirhiw8:pscale_pw_k7kY1HvI5XnaRKePgW52jv01EQXj8FxJFAhL43YCTzP@us-east.connect.psdb.cloud/cannabis_delivery_v1?ssl={"rejectUnauthorized":true}" \
  -d registry.supertokens.io/supertokens/supertokens-mysql