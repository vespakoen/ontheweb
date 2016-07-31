FROM gliderlabs/alpine:3.3
MAINTAINER Koen Schmeets <hello@koenschmeets.nl>

RUN apk update && apk-install openssh-client rsync

# Security fix for CVE-2016-0777 and CVE-2016-0778
RUN echo -e 'Host *\nUseRoaming no' >> /etc/ssh/ssh_config

ENTRYPOINT ["ssh"]