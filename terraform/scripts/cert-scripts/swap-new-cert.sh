region="asia-east2"
cert_name="gras-ssl-cert"
tmp_cert_name="tmp-gras-ssl-cert"
private_key_file="terraform/certs/privkey.pem"
certificate_file="terraform/certs/fullchain.pem"

echo "Updating SSL certificate to $cert_name"

# Update again to change the ssl-certificate name back to the original name, so there is not an error when running `terraform destroy`
gcloud compute ssl-certificates create $cert_name --certificate $certificate_file --private-key $private_key_file --region $region
gcloud compute target-https-proxies update l7-xlb-proxy-https --ssl-certificates $cert_name --region $region
gcloud compute ssl-certificates delete $tmp_cert_name --region $region --quiet

echo "Updated SSL certificate to $cert_name"