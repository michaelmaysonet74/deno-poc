import { OakRouter } from "../deps.ts";

const router = new OakRouter();

router.get("/api/hello-world", (ctx) => {
  ctx.response.body = "Hello World!";
});

export default router;
