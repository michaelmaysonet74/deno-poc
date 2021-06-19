FROM denoland/deno:1.11.1

WORKDIR /app

USER deno

COPY /src/deps.ts .
RUN deno cache deps.ts

ADD /src .
RUN deno cache server.ts

EXPOSE 8080

CMD ["run", "--allow-all", "server.ts"]
