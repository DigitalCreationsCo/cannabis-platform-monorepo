DIR="$(  cd "$( dirname "$0" )" && pwd )"

gcloud iam service-accounts keys create key.json \
   --iam-account dns01-solver@gras-cannabis.iam.gserviceaccount.com &&
kubectl create secret generic clouddns-dns01-solver-svc-acct \
   --from-file=key.json