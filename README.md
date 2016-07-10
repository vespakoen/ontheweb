# ontheweb

[![Build Status](https://ci.koenschmeets.nl/api/badges/vespakoen/ontheweb/status.svg)](https://ci.koenschmeets.nl/vespakoen/ontheweb)

This is the repository that contains my personal website, and websites for my open source projects.

## What's in it

- `koenschmeets` My personal website [www.koenschmeets.nl](https://www.koenschmeets.nl)
- `dwaler` The website for my compass-only navigation system [www.dwaler.com](https://www.dwaler.com)
- `humming`  The app for finding songs by humming it, or helping others find their song (human-based shazam) [www.humming.guru](https://www.humming.guru)

## How it works

I use `docker-machine` to create a VM on DigitalOcean (they call it a Droplet), I throw some docker images on it using `docker-compose`.
SSL certificates are automatically managed using `https-portal`, a wrapper around `acme-tiny`.

That's it, now head over to one of my websites and drop a comment ;)
