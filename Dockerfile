FROM hayd/deno:1.6.2

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache server.ts

EXPOSE 8080

CMD [ "run", "--allow-net", "server.ts" ]
