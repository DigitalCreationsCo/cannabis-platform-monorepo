# resource "google_dns_managed_zone" "gras_cannabis_org" {
#   name     = var.project_id
#   dns_name = "${var.domain_name}."
#   project  = var.project_id
# }

# resource "google_dns_record_set" "gras_cannabis_org_root" {
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name

#   name    = "${google_dns_managed_zone.gras_cannabis_org.dns_name}"
#   type    = "A"
#   rrdatas = ["${google_compute_address.default.address}"]
#   ttl     = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project
# }

# resource "google_dns_record_set" "gras_cannabis_org_dashboard" {
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name

#   name    = "app.${google_dns_managed_zone.gras_cannabis_org.dns_name}"
#   type    = "A"
#   rrdatas = ["${google_compute_address.default.address}"]
#   ttl     = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project
# }

# resource "google_dns_record_set" "gras_cannabis_org_wildcard" {
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name

#   name    = "*.${google_dns_managed_zone.gras_cannabis_org.dns_name}"
#   type    = "A"
#   rrdatas = ["${google_compute_address.default.address}"]
#   ttl     = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project
# }

# resource "google_dns_record_set" "gras_cannabis_org_backend" {
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name

#   name    = "backend.${google_dns_managed_zone.gras_cannabis_org.dns_name}"
#   type    = "A"
#   rrdatas = ["${google_compute_address.default.address}"]
#   ttl     = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project
# }

# resource "google_dns_record_set" "gras_cannabis_org_www" {
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name

#   name    = "www.${google_dns_managed_zone.gras_cannabis_org.dns_name}"
#   type    = "A"
#   rrdatas = ["${google_compute_address.default.address}"]
#   ttl     = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project
# }

# resource "google_dns_record_set" "gras_cannabis_org_widget" {
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name

#   name    = "widget.${google_dns_managed_zone.gras_cannabis_org.dns_name}"
#   type    = "A"
#   rrdatas = ["${google_compute_address.default.address}"]
#   ttl     = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project
# }

# resource "google_dns_record_set" "mx" {
#   name         = google_dns_managed_zone.gras_cannabis_org.dns_name
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name
#   type         = "MX"
#   ttl          = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project

#   rrdatas = [
#     "1 aspmx.l.google.com.",
#     "5 alt1.aspmx.l.google.com.",
#     "5 alt2.aspmx.l.google.com.",
#     "10 alt3.aspmx.l.google.com.",
#     "10 alt4.aspmx.l.google.com.",
#   ]
# }

# resource "google_dns_record_set" "spf" {
#   name         = google_dns_managed_zone.gras_cannabis_org.dns_name
#   managed_zone = google_dns_managed_zone.gras_cannabis_org.name
#   type         = "TXT"
#   ttl          = 60

#   project = google_dns_managed_zone.gras_cannabis_org.project

#   rrdatas = [
#     "\"v=spf1 a ~all\"",
#     "\"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAni7JZWAHi0Bs08rYHItXq3IjoWtDeuo/yOu/jvIxxCTIUWIlUn8EWHDyBQP8klTTCYtJl6bWV3ucMQNKrQ1BmjKZgYF/axv31PyfW2oFRiiNGj/hfCcZjOW2E\"9A/AyJYoeYIkkV/GOO3c59xTjUF0c/KTytpp8WQovyIPueUHpvgYKlygkpRgDPU4pWSwUodxUgngbFaKUbpUwtzYFWypDkDkxWtaneEXTViJ+pS5x5ePlB2piiet45C1Aty2YeUgrGqavIcyd5/g4R6JwemMaXXF9Rgo66Fo9HSr8tYWXAvsccKCP8CGlG4gOwrCRUrRL64aBkdeIm5u1TyDpRw+wIDAQAB",
#     ]
# }