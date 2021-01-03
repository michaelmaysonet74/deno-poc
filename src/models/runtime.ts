export interface Runtime {
  _id?: { $oid: string };
  name: string;
  description: string;
  version: string;
  releaseDate: Date;
  isLatestRelease: boolean;
  website?: string;
}
