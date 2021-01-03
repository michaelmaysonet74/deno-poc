import { Runtime } from "../models/runtime.ts";

export const deno1: Runtime = {
  name: "Deno",
  description: "A secure runtime for JavaScript and TypeScript",
  version: "1.5.2",
  releaseDate: new Date("2020-11-09"),
  isLatestRelease: false,
  website: "https://github.com/denoland/deno/releases/tag/1.5.2",
};

export const deno2: Runtime = {
  name: "Deno",
  description: "A secure runtime for JavaScript and TypeScript",
  version: "1.6.1",
  releaseDate: new Date("2020-12-14"),
  isLatestRelease: false,
  website: "https://github.com/denoland/deno/releases/tag/v1.6.1",
};

export const node: Runtime = {
  name: "Node.js",
  description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
  version: "15.5.0",
  releaseDate: new Date("2020-12-09"),
  isLatestRelease: true,
  website: "https://nodejs.org/en/download/current/",
};

export const runtimes: Runtime[] = [deno1, deno2, node];
