import { OakRouter } from "../deps.ts";
import { Runtime } from "../models/runtime.ts";
import {
  createRuntime,
  getRuntimeById,
  getRuntimeByVersion,
  getRuntimes,
} from "../data-functions/runtime.ts";

const router = new OakRouter();

router.get("/", async (ctx) => {
  ctx.response.body = await getRuntimes();
});

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.response.body = await getRuntimeById(id ?? "");
});

router.get("/:version", async (ctx) => {
  const { version } = ctx.params;
  ctx.response.body = await getRuntimeByVersion(version);
});

router.post("/", async (ctx) => {
  try {
    const runtime = await ctx.request.body().value as Runtime;
    const newId = await createRuntime(runtime);

    if (newId?.$oid) {
      ctx.response.body = await getRuntimeById(newId.$oid);
      ctx.response.status = 201;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

router.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  console.log(id);
});

router.delete("/:id", async (ctx) => {
  const { id } = ctx.params;
  console.log(id);
});

export default router;
