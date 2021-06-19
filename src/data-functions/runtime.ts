import { Runtime } from "../models/runtime.ts";
import { getDB } from "../db/mongo.ts";
import { Bson } from "../deps.ts";

const db = await getDB();
const runtimes = db?.collection<Runtime>("runtime");

const getBsonId = (id: string) => new Bson.ObjectId(id);

export const getRuntimes = async (): Promise<Runtime[]> =>
 await runtimes?.find({})?.toArray() ?? [];

export const getRuntimeById = async (
  id: string,
): Promise<Runtime | null> => await runtimes?.findOne({ _id: getBsonId(id) }) ?? null;

export const getRuntimeByVersion = async (
  version?: string,
): Promise<Runtime | null> => await runtimes?.findOne({ version }) ?? null;

export const createRuntime = async (runtime: Runtime) =>
  await runtimes?.insertOne(runtime);

export const updateRuntime = async (id: string, runtime: Runtime): Promise<Runtime> => {
  const oldRuntime = await getRuntimeById(id);
  const update = { ...oldRuntime, ...runtime };
  await runtimes?.updateOne({ _id: getBsonId(id) }, update);
  return update;
};

export const deleteRuntime = async (id: string) =>
  await runtimes?.deleteOne({ _id: getBsonId(id) });
