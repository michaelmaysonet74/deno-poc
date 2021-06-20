import { Bson, encodeToString } from "../deps.ts";
import { getBsonId } from "./mongo.ts";

const createBsonId = (): Bson.ObjectID =>
  getBsonId(encodeToString(crypto.getRandomValues(new Uint8Array(12))));

const filterBy = <T>(_: T, filters: Bson.Document): boolean => {
  for (const [key, value] of Object.entries(filters)) {
    if ((_ as Record<string, unknown>)?.[key] !== value) {
      return false;
    }
  }
  return true;
};

interface ObjectWithId {
  _id: Bson.ObjectID;
}

export default Object.freeze({
  store: {} as Record<string, unknown>,
  collection<T>(name: string) {
    if (!this.store?.[name]) {
      this.store[name] = [] as T[];
    }

    let collection = this.store[name] as T[];
    return {
      find(filters: Bson.Document) {
        return {
          toArray: (): T[] =>
            Object.keys(filters).length
              ? collection.filter((_: T) => filterBy(_, filters))
              : collection,
        };
      },
      findOne({ _id, ...filters }: Bson.Document): T | undefined {
        const id = _id?.toString();
        return id
          ? collection.find((_: T) =>
            (_ as unknown as ObjectWithId)._id.toString() === id
          )
          : collection.find((_: T) => filterBy(_, filters));
      },
      insertOne(item: T): Bson.ObjectID {
        const record = { _id: createBsonId(), ...item };
        collection.push(record);
        return record._id;
      },
      updateOne({ _id }: Bson.Document, item: T): void {
        this.deleteOne({ _id });
        collection.push(item);
      },
      deleteOne({ _id }: Bson.Document): void {
        const id = _id.toString();
        collection = collection.filter((_: T) =>
          (_ as unknown as ObjectWithId)._id.toString() !== id
        );
      },
    };
  },
});
