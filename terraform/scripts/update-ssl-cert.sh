# this file has been provided, I will try to use cert-manager for automatic certificate renewal

# If you have enabled HTTPS and want to update the SSL certificate, this script will help make it easier to do the swap.

# Update these values for your use!
region="asia-east2"
cert_name="gras-ssl-cert"
tmp_cert_name="tmp-gras-ssl-cert"
private_key_file="terraform/certs/intermediate/ssl.key"
certificate_file="terraform/certs/intermediate/ssl.crt"

# Create a temporary ssl-certificate
gcloud compute ssl-certificates create $tmp_cert_name --certificate $certificate_file --private-key $private_key_file --region $region
gcloud compute target-https-proxies update l7-xlb-proxy-https --ssl-certificates $tmp_cert_name --region $region
gcloud compute ssl-certificates delete $cert_name --region $region --quiet

# Update again to change the ssl-certificate name back to the original name, so there is not an error when running `terraform destroy``
gcloud compute ssl-certificates create $cert_name --certificate $certificate_file --private-key $private_key_file --region $region
gcloud compute target-https-proxies update l7-xlb-proxy-https --ssl-certificates $cert_name --region $region
gcloud compute ssl-certificates delete $tmp_cert_name --region $region --quiet