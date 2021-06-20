import { Bson, encodeToString } from "../deps.ts";
import { getBsonId } from "./mongo.ts";

const createBsonId = () =>
  getBsonId(encodeToString(crypto.getRandomValues(new Uint8Array(12))));

const filterBy = <T>(_: T, filters: Bson.Document): boolean => {
  for (const [key, value] of Object.entries(filters)) {
    if ((_ as Record<string, unknown>)?.[key] !== value) {
      return false;
    }
  }
  return true;
};

const PseudoDB = Object.freeze({
  store: {} as Record<string, unknown>,
  collection<T>(name: string) {
    if (!this.store?.[name]) {
      this.store[name] = [] as T[];
    }

    let collection = this.store[name] as T[];
    return {
      find(filters: Bson.Document) {
        return {
          toArray: () =>
            Object.keys(filters).length
              ? collection.filter((_: T) => filterBy(_, filters))
              : collection,
        };
      },
      findOne({ _id, ...filters }: Bson.Document) {
        const id = _id?.toString();
        return id
          ? collection.find((_: T) =>
            (_ as unknown as { _id: Bson.ObjectID })._id.toString() === id
          )
          : collection.find((_: T) => filterBy(_, filters));
      },
      insertOne(item: T) {
        const record = { _id: createBsonId(), ...item };
        collection.push(record);
        return record._id;
      },
      updateOne({ _id }: Bson.Document, item: T) {
        this.deleteOne({ _id });
        collection.push(item);
      },
      deleteOne({ _id }: Bson.Document) {
        const id = _id.toString();
        collection = collection.filter((_: T) =>
          (_ as unknown as { _id: Bson.ObjectID })._id.toString() !== id
        );
      },
    };
  },
});

export default PseudoDB;
