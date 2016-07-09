#!/bin/sh
. ./env.sh
docker-machine ssh ks mkdir /config
docker-machine scp ./default.conf.erb ks:/config/
docker-machine scp ./default.ssl.conf.erb ks:/config/
docker-compose pull
docker-compose up -d
docker-compose logs -f
