import { Bson, encodeToString, MongoClient } from "../deps.ts";

export const getBsonId = (id: string) => new Bson.ObjectId(id);

const createBsonId = () =>
  getBsonId(encodeToString(crypto.getRandomValues(new Uint8Array(12))));

function filterBy<T>(_: T, filters: Bson.Document): boolean {
  for (const [key, value] of Object.entries(filters)) {
    if ((_ as Record<string, unknown>)?.[key] !== value) {
      return false;
    }
  }
  return true;
}

const pseudoMongoDB = Object.freeze({
  store: {} as Record<string, unknown>,
  collection<T>(name: string) {
    if (!this.store?.[name]) {
      this.store[name] = [] as T[];
    }
    return {
      collection: this.store[name] as T[],
      find(filters: Bson.Document) {
        return {
          toArray: () =>
            Object.keys(filters).length
              ? this.collection.filter((_: T) => filterBy(_, filters))
              : this.collection,
        };
      },
      findOne({ _id, ...filters }: Bson.Document) {
        const id = _id?.toString();
        return id
          ? this.collection.find((_: T) =>
            (_ as unknown as { _id: Bson.ObjectID })._id.toString() === id
          )
          : this.collection.find((_: T) => filterBy(_, filters));
      },
      insertOne(item: T) {
        const record = { _id: createBsonId(), ...item };
        this.collection.push(record);
        return record._id;
      },
      updateOne({ _id }: Bson.Document, item: T) {
        this.deleteOne({ _id });
        this.collection.push(item);
      },
      deleteOne({ _id }: Bson.Document) {
        const id = _id.toString();
        this.collection = this.collection.filter((_: T) =>
          (_ as unknown as { _id: Bson.ObjectID })._id.toString() !== id
        );
      },
    };
  },
});

export const getDB = async () => {
  try {
    const client = new MongoClient();
    await client.connect("mongodb://mongo:27017");
    return client.database("deno");
  } catch (e) {
    console.error(e);
    return pseudoMongoDB;
  }
};
