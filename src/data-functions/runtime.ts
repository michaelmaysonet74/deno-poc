import { Runtime } from "../models/runtime.ts";
import { getDB } from "../db/mongo.ts";

const db = getDB();
const runtimes = db?.collection<Runtime>("runtime");

export const getRuntimes = async (): Promise<Runtime[]> =>
  await runtimes?.find({}) || [];

export const getRuntimeById = async (
  id: string,
): Promise<Runtime | null> =>
  await runtimes?.findOne({ _id: { $oid: id } }) || null;

export const getRuntimeByVersion = async (
  version?: string,
): Promise<Runtime | null> => await runtimes?.findOne({ version }) || null;

export const createRuntime = async (runtime: Runtime) =>
  await runtimes?.insertOne(runtime);

export const updateRuntime = async () => undefined;

export const deleteRuntime = async () => undefined;