FROM mhart/alpine-node:6

ENV LANG en_US.UTF-8

RUN mkdir -p /code
WORKDIR /code

COPY ./package.json /code/
RUN npm install --production
RUN apk add --no-cache curl
COPY . /code

CMD [ "npm", "start" ]