FROM node:18-alpine AS dependencies
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn --frozen-lockfile --production

FROM node:18-alpine AS build
WORKDIR /code

COPY . .
COPY --from=dependencies /code/node_modules ./node_modules

RUN yarn --frozen-lockfile
RUN yarn build

FROM node:18-alpine AS production
WORKDIR /code

ENV PORT 3000
EXPOSE $PORT

ARG VERSION
ARG COMMIT_SHA
ARG BUILD_TIMESTAMP

ENV VERSION=$VERSION
ENV COMMIT_SHA=$COMMIT_SHA
ENV BUILD_TIMESTAMP=$BUILD_TIMESTAMP

COPY --from=dependencies /code/node_modules ./node_modules
COPY --from=build /code/build /code/build
COPY --from=build /code/public /code/public
COPY ./package.json ./package.json
COPY ./remix.config.js ./remix.config.js

CMD ["yarn", "start"]
