#!/bin/sh
eval "$(docker-machine env ks)"
. ./env.sh
lektor build -O public
docker-compose build
docker-compose up -d
docker-compose logs -f
