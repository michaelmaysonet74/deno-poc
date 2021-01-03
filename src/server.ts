import { OakApp } from "./deps.ts";
import RuntimeResource from "./resources/runtime.ts";
import HelloResource from "./resources/hello.ts";

const app = new OakApp();

app.use(RuntimeResource.routes());
app.use(RuntimeResource.allowedMethods());

app.use(HelloResource.routes());
app.use(HelloResource.allowedMethods());

const PORT = 8080;
console.log(`Listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });
