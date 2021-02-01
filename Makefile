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
	@docker build -t $(IMAGE_NAME):dev .

.PHONY: test
test: build database_start
	@docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run build && npm run test'

.PHONY: start
start: build database_start
	@docker-compose up $(SERVICE_NAME) && docker-compose down

.PHONY: clean
clean:
	@docker-compose down --rmi local --volumes --remove-orphans

.PHONY: database_start
database_start:
	@docker-compose up -d mongo

.PHONY: local/start
local/start: database_start
	@npm run build && npm run start

.PHONY: local/dev
local/dev: database_start
	@npm run build && npm run dev

.PHONY: local/test
local/test: database_start
	@npm run build && npm run test

.PHONY: local/test-features
local/test-features: database_start
	@npm run build && npm run test:features

.PHONY: local/test-unit
local/test-unit: database_start
	@npm run build && npm run test:unit

.PHONY: destroy
destroy: clear
	@sudo rm -rf dist && sudo rm -rf node_modules

.PHONY: clear
clear: stop
	@sudo rm -rf data && sudo rm -rf .tmp

PHONY: stop
stop:
	@docker-compose stop
