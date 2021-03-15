FROM nginx:1.19-alpine
WORKDIR /code

COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache curl
HEALTHCHECK CMD curl --fail http://localhost/ping || exit 1
