#!/bin/bash

. ./env.sh

# docker-machine create \
#   --driver digitalocean \
#   --digitalocean-access-token=$DIGITALOCEAN_ACCESS_TOKEN \
#   --digitalocean-region=fra1 \
#   --digitalocean-image "ubuntu-16-04-x64" \
#   --digitalocean-size=1gb \
#   --digitalocean-ipv6 \
#   $MACHINE_NAME

# docker-machine scp ./add_swap.sh $MACHINE_NAME:/add_swap.sh
# docker-machine ssh $MACHINE_NAME chmod +x /add_swap.sh
# docker-machine ssh $MACHINE_NAME sudo /add_swap.sh

docker-machine --debug create \
  --driver generic \
  --generic-ip-address 148.251.12.99 \
  --generic-ssh-key ~/.ssh/id_rsa \
  $MACHINE_NAME
