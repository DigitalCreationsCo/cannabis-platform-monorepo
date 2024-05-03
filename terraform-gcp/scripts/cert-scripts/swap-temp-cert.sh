region="us-east5"
cert_name="gras-ssl-cert"
tmp_cert_name="tmp-gras-ssl-cert"
private_key_file="terraform/certs/privkey.pem"
certificate_file="terraform/certs/fullchain.pem"

echo "Updating SSL certificate to $tmp_cert_name"

gcloud compute ssl-certificates create $tmp_cert_name --certificate $certificate_file --private-key $private_key_file --region $region
gcloud compute target-https-proxies update l7-xlb-proxy-https --ssl-certificates $tmp_cert_name --region $region
gcloud compute ssl-certificates delete $cert_name --region $region --quiet

echo "Updated SSL certificate to $tmp_cert_name"