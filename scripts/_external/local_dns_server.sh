docker run -d \
  --name bind9 \
  -p 53:53 \
  -p 53:53/udp \
  -v /etc/bind/named.conf.local:/etc/bind/named.conf \
  -v /etc/bind/zones/grascannabis.org:/var/bind/pri/example.com.zone \
  mjkaye/bind9-alpine