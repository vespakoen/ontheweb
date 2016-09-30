FROM ubuntu:xenial

MAINTAINER mmd <mmd.osm@gmail.com>

# no tty
ARG DEBIAN_FRONTEND=noninteractive

ARG OSM_VER=0.7.55
ENV EXEC_DIR=/srv/osm3s
ENV DB_DIR=/srv/osm3s/db

RUN build_deps="g++ make expat autoconf automake autotools-dev libtool curl ca-certificates unzip wget" \
  && set -x \
  && echo "#!/bin/sh\nexit 0" >/usr/sbin/policy-rc.d \
  && apt-get update  \
  && apt-get install -y --force-yes --no-install-recommends \
       $build_deps \
       fcgiwrap \
       spawn-fcgi \
       nginx \
       bzip2 \
       libexpat1-dev \
       zlib1g-dev \
       liblz4-dev \
       libfcgi-dev \
       bzip2 \
       supervisor \
  && rm /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default \
  && rm -rf /var/lib/apt/lists/* \
  && wget --progress=dot -e dotbytes=100M http://mirror2.shellbot.com/osm/planet-latest.osm.bz2 -O /planet.osm.bz2 \
  && curl -o osm-3s_v$OSM_VER.zip https://codeload.github.com/mmd-osm/Overpass-API/zip/test755 \
  && unzip osm-3s_v${OSM_VER}.zip \
  && cd Overpass-API-test755 \
  && cd src/ \
  && autoscan \
  && aclocal \
  && autoheader \
  && libtoolize \
  && automake --add-missing \
  && autoconf \
  && cd .. \
  && mkdir -p build \
  && cd build \
  && ../src/configure CXXFLAGS="-O3 -std=c++11" LDFLAGS="-lpthread" --enable-lz4 --prefix="$EXEC_DIR" \
  && make V=0 -j3 install \
  && cd ../.. \
  && rm -rf Overpass-API-test755 \
  && apt-get purge -y --auto-remove $build_deps

WORKDIR /usr/src/app

ARG PLANET_FILE=/planet.osm.bz2

RUN groupadd -r overpass && useradd -r -g overpass overpass

RUN mkdir -p "$DB_DIR" && \
    chown overpass "$DB_DIR"

RUN su overpass -c "/srv/osm3s/bin/init_osm3s.sh "$PLANET_FILE" "$DB_DIR" "$EXEC_DIR" --meta --compression_method=lz4"
RUN rm -f "$PLANET_FILE"

COPY nginx.conf /etc/nginx/nginx.conf
COPY overpass /etc/init.d
COPY interpreter /etc/init.d
COPY interpreter.conf /etc/supervisor/conf.d
COPY docker-start /usr/local/sbin

CMD ["/usr/local/sbin/docker-start"]

EXPOSE 80