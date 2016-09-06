#!/bin/bash

. ./env.sh
eval "$(docker-machine env default)"
echo "Signing .drone.yml"
docker run -v $(pwd):/project --rm drone/drone:0.5 -t $DRONE_USER_TOKEN -s http://176.9.59.53:8000 sign vespakoen/ontheweb --in "/project/.drone.yml" --out "/project/.drone.yml.sig"
