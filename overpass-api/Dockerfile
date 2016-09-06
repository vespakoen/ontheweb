FROM ubuntu:14.04

RUN apt-get update && apt-get install -y \
  autoconf \ 
  automake1.11 \
  expat \
  git \
  g++ \
  libtool \
  libexpat1-dev \ 
  make \
  zlib1g-dev \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/drolbr/Overpass-API.git

RUN cd /Overpass-API/src && \
  autoscan && \
  aclocal-1.11 && \
  autoheader && \
  libtoolize && \
  automake-1.11 --add-missing && \
  autoconf && \
  cd /Overpass-API/build && \
  ../src/configure CXXFLAGS="-O3" --prefix=/srv && \
  make install -j 4 

RUN /Overpass-API && \
  ./bin/download_clone.sh --source=http://dev.overpass-api.de/api_drolbr/ --db-dir="db/" --meta=yes

RUN wget -O planet.osm.bz2 "http://ftp.heanet.ie/mirrors/openstreetmap.org/planet-latest.osm.bz2"