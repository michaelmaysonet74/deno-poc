import { MongoClient } from "../deps.ts";

export const getDB = () => {
  const client = new MongoClient();
  client.connectWithUri("mongodb://mongo:27017");

  try {
    return client.database("deno");
  } catch (e) {
    console.log(e);
  }
};
