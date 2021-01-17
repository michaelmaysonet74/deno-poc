import { Runtime } from "../models/runtime.ts";
import { getDB } from "../db/mongo.ts";

const db = getDB();
const runtimes = db?.collection<Runtime>("runtime");

export const getRuntimes = async (): Promise<Runtime[]> =>
  runtimes?.find({}) ?? [];

export const getRuntimeById = async (
  id: string,
): Promise<Runtime | null> => runtimes?.findOne({ _id: { $oid: id } }) || null;

export const getRuntimeByVersion = async (
  version?: string,
): Promise<Runtime | null> => runtimes?.findOne({ version }) || null;

export const createRuntime = async (runtime: Runtime) =>
  runtimes?.insertOne(runtime);

export const updateRuntime = async (id: string, runtime: Runtime) => {
  const oldRuntime = await getRuntimeById(id);
  const update = { ...oldRuntime, ...runtime };
  await runtimes?.updateOne({ _id: { $oid: id } }, update);
  return update;
};

export const deleteRuntime = async (id: string) =>
  runtimes?.deleteOne({ _id: { $oid: id } });
