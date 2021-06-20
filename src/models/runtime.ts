import { Bson } from "../deps.ts";

export interface Runtime {
  _id?: Bson.ObjectId;
  name: string;
  description: string;
  version: string;
  releaseDate: Date;
  isLatestRelease: boolean;
  website?: string;
}
