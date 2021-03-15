FROM node:14-alpine
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./.next ./.next
COPY ./public ./public

RUN yarn install --production --pure-lockfile

FROM node:14-alpine
WORKDIR /code

ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NODE_ENV=production

HEALTHCHECK CMD curl --fail http://localhost:3000/api/ping || exit 1

CMD ["yarn", "start"]

EXPOSE 3000

COPY --from=0 /code /code

RUN apk add --no-cache curl
