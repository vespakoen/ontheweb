#!/bin/sh
. ./env.sh
docker-machine ssh ks mkdir /config
docker-machine scp ./nginx.conf.erb ks:/config/
docker-machine scp ./default.conf.erb ks:/config/
docker-machine scp ./default.ssl.conf.erb ks:/config/
docker-machine scp ./sftp.sh ks:/config/
docker-compose pull
docker-compose up -d --remove-orphans
docker-compose logs -f
