#!/bin/sh
. ./env.sh
docker-compose pull
docker-compose stop -f
docker-compose rm --all
docker-compose up -d --remove-orphans
docker-compose logs -f
