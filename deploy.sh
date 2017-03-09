#!/bin/sh

. ./env.sh
docker-compose pull
docker-compose stop
docker-compose rm
docker-compose up -d --remove-orphans
docker-compose logs -f
