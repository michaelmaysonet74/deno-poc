import { OakRouter } from "../deps.ts";
import { getRuntimeByVersion, getRuntimes } from "../data-functions/runtime.ts";

const router = new OakRouter();

router.get("/api/runtime", async (ctx) => {
  ctx.response.body = await getRuntimes();
});

router.get("/api/runtime/:version", async (ctx) => {
  const { version } = ctx.params;
  ctx.response.body = await getRuntimeByVersion(version);
});

export default router;
