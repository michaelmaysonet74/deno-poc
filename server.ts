import { OakApp, OakRouter } from "./deps.ts";

interface Runtime {
  name: string;
  description: string;
  version: string;
  releaseDate: Date;
  isLatestRelease: boolean;
}

const deno1: Runtime = {
  name: "Deno",
  description: "A secure runtime for JavaScript and TypeScript",
  version: "1.5.2",
  releaseDate: new Date("2020-11-09"),
  isLatestRelease: false,
};

const deno2: Runtime = {
  name: "Deno",
  description: "A secure runtime for JavaScript and TypeScript",
  version: "1.6.1",
  releaseDate: new Date("2020-12-14"),
  isLatestRelease: true,
};

const node: Runtime = {
  name: "Node.js",
  description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
  version: "15.4.0",
  releaseDate: new Date("2020-12-09"),
  isLatestRelease: true,
};

const runtimes: Runtime[] = [deno1, deno2, node];

const app = new OakApp();
const router = new OakRouter();

router.get("/api/runtime", (ctx) => {
  ctx.response.body = runtimes;
});

router.get("/api/runtime/:version", (ctx) => {
  const { version } = ctx.params;
  ctx.response.body = runtimes.find((r) => r.version === version);
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8080;
console.log(`Listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });
