#!/bin/sh
. ./env.sh
docker-machine ssh ks mkdir /config 2> /dev/null
docker-machine scp ./nginx.conf.erb ks:/config/
docker-machine scp ./default.conf.erb ks:/config/
docker-machine scp ./default.ssl.conf.erb ks:/config/
docker-machine scp ./sftp.sh ks:/config/
docker-compose pull
docker-compose rm --all
docker-compose up -d --remove-orphans
docker-compose logs -f
