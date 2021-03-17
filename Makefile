PWD = $(shell pwd)

DOCKER_REGISTRY = registry.digitalocean.com/evixio
DOCKER_COMPOSE = ./.docker/docker-compose.production.yml
DOCKERFILE_NODE = ./.docker/node/Dockerfile
DOCKERFILE_NGINX = ./.docker/nginx/Dockerfile

TAG_PREFIX = ${DOCKER_REGISTRY}/web
TAG_NODE = ${TAG_PREFIX}/node
TAG_NGINX = ${TAG_PREFIX}/nginx

all: build

clean:
	-rm -rf ./node_modules
	-rm -rf ./.next
	-rm -rf /.dist

node_modules: yarn.lock
	docker run --rm -v ${PWD}:/code -w /code node:14 yarn --pure-lockfile

lint: node_modules
	docker run --rm -v ${PWD}:/code -w /code node:14 yarn lint

build: node_modules
	docker run --rm -v ${PWD}:/code -w /code \
			-e NEXT_PUBLIC_APP_URL \
		node:14 yarn build
	docker build -f ${DOCKERFILE_NODE} \
		--build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
		--build-arg DIGITALOCEAN_API_KEY=${DIGITALOCEAN_API_KEY} \
		-t ${TAG_NODE} .
	docker build -f ${DOCKERFILE_NGINX} -t ${TAG_NGINX} .

docker-login:
	docker login ${DOCKER_REGISTRY} -u ${DOCKER_REGISTRY_USER} -p ${DOCKER_REGISTRY_PASS}

push:
	docker push ${TAG_NODE}
	docker push ${TAG_NGINX}

deploy:
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p ${DEPLOY_PATH}"
	scp ${DOCKER_COMPOSE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/docker-compose.yml
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}; docker-compose pull"
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}; docker-compose up -d"
