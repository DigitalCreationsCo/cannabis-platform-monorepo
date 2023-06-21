
resource "linode_domain" "gras_cannabis" {
    domain      = "grascannabis.org"
    soa_email   = "bmejiadeveloper2@gmail.com"
    status      = "active"
    type        = "master"
}

resource "linode_domain_record" "gras_cannabis_domain_root" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 80
    priority    = 0
    record_type = "A"
    target      = "139.144.255.55"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_dashboard" {
    domain_id   = linode_domain.gras_cannabis.id
    name        = "app"
    port        = 80
    priority    = 0
    record_type = "A"
    target      = "139.144.255.55"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_spf" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 0
    priority    = 50
    record_type = "TXT"
    target      = "v=spf1 a ~all"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_wildcard" {
    domain_id   = linode_domain.gras_cannabis.id
    name        = "*"
    port        = 80
    priority    = 0
    record_type = "A"
    target      = "139.144.255.55"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_backend" {
    domain_id   = linode_domain.gras_cannabis.id
    name        = "backend"
    port        = 80
    priority    = 0
    record_type = "A"
    target      = "139.144.255.55"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_dkim" {
    domain_id   = linode_domain.gras_cannabis.id
    name        = "google._domainkey"
    port        = 0
    priority    = 50
    record_type = "TXT"
    target      = "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAni7JZWAHi0Bs08rYHItXq3IjoWtDeuo/yOu/jvIxxCTIUWIlUn8EWHDyBQP8klTTCYtJl6bWV3ucMQNKrQ1BmjKZgYF/axv31PyfW2oFRiiNGj/hfCcZjOW2E9A/AyJYoeYIkkV/GOO3c59xTjUF0c/KTytpp8WQovyIPueUHpvgYKlygkpRgDPU4pWSwUodxUgngbFaKUbpUwtzYFWypDkDkxWtaneEXTViJ+pS5x5ePlB2piiet45C1Aty2YeUgrGqavIcyd5/g4R6JwemMaXXF9Rgo66Fo9HSr8tYWXAvsccKCP8CGlG4gOwrCRUrRL64aBkdeIm5u1TyDpRw+wIDAQAB"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_www" {
    domain_id   = linode_domain.gras_cannabis.id
    name        = "www"
    port        = 80
    priority    = 0
    record_type = "A"
    target      = "139.144.255.55"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_mx1" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 0
    priority    = 1
    record_type = "MX"
    target      = "aspmx.l.google.com"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_mx2" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 0
    priority    = 5
    record_type = "MX"
    target      = "alt1.aspmx.l.google.com"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_mx3" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 0
    priority    = 5
    record_type = "MX"
    target      = "alt2.aspmx.l.google.com"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_mx4" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 0
    priority    = 10
    record_type = "MX"
    target      = "alt3.aspmx.l.google.com"
    ttl_sec     = 60
    weight      = 0
}

resource "linode_domain_record" "gras_cannabis_domain_mx5" {
    domain_id   = linode_domain.gras_cannabis.id
    port        = 0
    priority    = 10
    record_type = "MX"
    target      = "alt4.aspmx.l.google.com"
    ttl_sec     = 60
    weight      = 0
}