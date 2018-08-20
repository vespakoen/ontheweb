FROM rickydunlop/nodejs-ffmpeg

VOLUME /data/media
VOLUME /data/db

RUN apk update \
  && apk --no-cache add python build-base sqlite

WORKDIR /src

ADD package.json .

RUN npm install --production

ADD . .

EXPOSE 8080

CMD ["npm", "start"]
