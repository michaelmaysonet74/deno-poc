# Deno POC

A microservice POC built with Deno and Oak.

## Getting Started

[Install Deno locally](https://deno.land/#installation) or use [Docker](https://www.docker.com/products/docker-desktop) to build and run the server.  

### Run Server Locally with Deno

```
$ deno run --allow-net server.ts
```

### Build and Run Server with Docker
```
$ docker build -t deno-poc . && docker run -it --init -p 8080:8080 deno-poc
```
