import { Bson, MongoClient } from "../deps.ts";
import PseudoDB from "./pseudo.ts";

export const getBsonId = (
  id: string,
): Bson.ObjectID => new Bson.ObjectId(id);

export const getDB = async () => {
  try {
    const client = new MongoClient();
    await client.connect("mongodb://mongo:27017");
    return client.database("deno");
  } catch (e) {
    console.error(e);
    return PseudoDB;
  }
};
