#!/bin/bash

. ./env.sh

function add_secret {
  docker run -v $(pwd):/project --rm drone/drone:0.5 -t $DRONE_USER_TOKEN -s https://ci.koenschmeets.nl secret add --image=$1 vespakoen/ontheweb $2 "$3"
}

function rm_secret {
  docker run -v $(pwd):/project --rm drone/drone:0.5 -t $DRONE_USER_TOKEN -s https://ci.koenschmeets.nl secret rm vespakoen/ontheweb $1
}

rm_secret DOCKER_REGISTRY
rm_secret DOCKER_USERNAME
rm_secret DOCKER_PASSWORD
add_secret docker DOCKER_REGISTRY $DOCKER_REGISTRY_URL
add_secret docker DOCKER_USERNAME $DOCKER_REGISTRY_USERNAME
add_secret docker DOCKER_PASSWORD $DOCKER_REGISTRY_PASSWORD

rm_secret SFTP_CACHE_SERVER
rm_secret SFTP_CACHE_USERNAME
rm_secret SFTP_CACHE_PASSWORD
rm_secret SFTP_CACHE_PATH
add_secret plugins/sftp-cache:latest SFTP_CACHE_SERVER $SFTP_CACHE_SERVER
add_secret plugins/sftp-cache:latest SFTP_CACHE_USERNAME $SFTP_CACHE_USERNAME
add_secret plugins/sftp-cache:latest SFTP_CACHE_PASSWORD $SFTP_CACHE_PASSWORD
add_secret plugins/sftp-cache:latest SFTP_CACHE_PATH $SFTP_CACHE_PATH
