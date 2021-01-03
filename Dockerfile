FROM hayd/deno:1.6.2

WORKDIR /app

COPY /src/deps.ts .
RUN deno cache --unstable deps.ts

ADD /src .
RUN deno cache --unstable server.ts

EXPOSE 8080

CMD ["run", "--allow-all", "--unstable", "server.ts"]
