import { OakApp, OakRouter } from "./deps.ts";

interface Deno {
    name: string;
    type: string;
    version: string;
    createdBy: string;
    releaseDate: Date;
}

const deno: Deno = {
    name: "Deno",
    type: "JS/TS Runtime",
    version: "1.5.2",
    createdBy: "Ryan Dahl",
    releaseDate: new Date("2020.11.09"),
};

const denos: Deno[] = [deno];

const app = new OakApp();
const router = new OakRouter();

router.get("/api/deno", (ctx) => {
    ctx.response.body = denos;
});

router.get("/api/deno/:version", (ctx) => {
    const { version } = ctx.params;
    ctx.response.body = denos.find(d => d.version === version);
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8080;
console.log(`Listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });
