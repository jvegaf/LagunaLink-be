SHELL := $(shell which bash)
IMAGE_NAME := lagunalink/lagunalink_be
SERVICE_NAME := app

.PHONY: default
default: build

.PHONY: deps
deps:
	@npm install

.PHONY: build
build:
	docker build -t $(IMAGE_NAME):dev .

.PHONY: test
test: build
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run build && npm run test'

.PHONY: start
start: build
	docker-compose up $(SERVICE_NAME) && docker-compose down

.PHONY: clean
clean:
	docker-compose down --rmi local --volumes --remove-orphans

.PHONY: start_database
start_database:
	docker-compose up -d mongo

.PHONY: destroy
destroy: clear
	@sudo rm -rf dist && rm -rf node_modules

.PHONY: clear
clear:
	@sudo rm -rf data && sudo rm -rf .tmp


