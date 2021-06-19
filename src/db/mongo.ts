import { MongoClient } from "../deps.ts";

export const getDB = async () => {
  try {
    const client = new MongoClient();
    await client.connect("mongodb://mongo:27017");
    return client.database("deno");
  } catch (e) {
    console.log(e);
  }
};
