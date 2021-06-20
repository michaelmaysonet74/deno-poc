# Deno POC

A microservice POC built with [Deno](https://github.com/denoland/deno) and
[Oak](https://github.com/oakserver/oak).

## Getting Started

[Install Deno locally](https://deno.land/#installation) or use
[Docker](https://www.docker.com/products/docker-desktop) to build and run the
server.

### Run Server Locally with Deno

```
$ deno run --allow-all --unstable ./src/server.ts
```

### Build and Run Server with Docker

```
$ docker build -t deno-poc . && docker run -it --init -p 8080:8080 deno-poc
```
