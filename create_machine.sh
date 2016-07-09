docker-machine create \
  --driver digitalocean \
  --digitalocean-access-token=$DIGITALOCEAN_ACCESS_TOKEN \
  --digitalocean-region=fra1 \
  --digitalocean-size=512mb \
  --digitalocean-ipv6 \
  ks
