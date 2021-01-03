docker-build:
	docker build -t deno-poc .

docker-dev:
	make docker-build && docker-compose up

local-dev:
	deno run --allow-net ./src/server.ts
