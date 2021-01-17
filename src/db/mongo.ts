import { MongoClient } from "../deps.ts";

export const getDB = () => {
  try {
    const client = new MongoClient();
    client.connectWithUri("mongodb://mongo:27017");
    return client.database("deno");
  } catch (e) {
    console.log(e);
  }
};
