# ontheweb

[![Build Status](https://ci.koenschmeets.nl/api/badges/vespakoen/ontheweb/status.svg)](https://ci.koenschmeets.nl/vespakoen/ontheweb)

This is the repository that contains my personal website, and websites for my open source projects.

## What's in it

- `koenschmeets` My personal website [www.koenschmeets.nl](https://www.koenschmeets.nl)
- `dwaler` The website for my compass-only navigation system [www.dwaler.com](https://www.dwaler.com)
- `humming`  The app for finding songs by humming it, or helping others find their song (human-based shazam) [www.humming.guru](https://www.humming.guru)
- `https-portal` Custom image for https-portal that enables ipv6 (didn't really test this yet)
- `lektor` Custom build of lektor, a static site generator, used to generate my website in the Drone CI
- `sftp-cache` Custom build of sftp-cache that `chown`'s the shared folder (used for caching drone build steps)

## How it works

- I used docker cloud to provision a server, updated my DNS records to point to it.
- Uploaded the docker-compose file as a "stack" and enabled auto-redeploy for all services.
- Run `./add_secrets.sh` to add the build secrets to Drone CI
- Use the CI tool to publish new docker images to the docker registry, docker cloud deploys them for me now.

## How it used to work

I am now experimenting with docker cloud, I left the scripts I used before that in the repository anyways.

- `./create_machine.sh` will create a VM on DigitalOcean (they call it a Droplet)
- Manual step, update the DNS records to point to the new VM
- `./deploy.sh` will throw some docker images on it using `docker-compose`.
- `./add_secrets.sh` will add the build secrets to Drone CI

That's it, now head over to one of my websites and drop a comment ;)
