import { OakRouter } from "../deps.ts";

const router = new OakRouter();

router.get("/api/hello-world", async (ctx) => {
  ctx.response.body = "Hello World!";
});

export default router;
