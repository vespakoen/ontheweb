FROM debian:wheezy

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections && \
  apt-get update && \
  apt-get install -y libssl-dev python2.7 python2.7-dev curl gcc libffi-dev imagemagick && \
  cd /usr/local/bin && ln -s /usr/bin/python2.7 python && \
  curl -sf https://www.getlektor.com/install.sh | sed '/stdin/d;s/input = .*/return/' > install.sh && \
  chmod +x ./install.sh && \
  ./install.sh

CMD ["lektor"]
