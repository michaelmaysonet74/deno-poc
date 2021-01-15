import { OakRouter } from "../deps.ts";
import { Runtime } from "../models/runtime.ts";
import {
  createRuntime,
  deleteRuntime,
  getRuntimeById,
  getRuntimeByVersion,
  getRuntimes,
  updateRuntime,
} from "../data-functions/runtime.ts";

const router = new OakRouter();

router.get("/api/runtimes", async (ctx) => {
  ctx.response.body = await getRuntimes();
});

router.get("/api/runtimes/:id", async (ctx) => {
  const { id = "" } = ctx.params;
  ctx.response.body = await getRuntimeById(id);
});

router.get("/api/runtimes/:version", async (ctx) => {
  const { version } = ctx.params;
  ctx.response.body = await getRuntimeByVersion(version);
});

router.post("/api/runtimes", async (ctx) => {
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

router.put("/api/runtimes/:id", async (ctx) => {
  try {
    const { id = "" } = ctx.params;
    const runtime = await ctx.request.body().value as Runtime;
    if (id && runtime) {
      ctx.response.body = await updateRuntime(id, runtime);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

router.delete("/api/runtimes/:id", async (ctx) => {
  try {
    const { id = "" } = ctx.params;
    if (id) {
      await deleteRuntime(id);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export default router;
