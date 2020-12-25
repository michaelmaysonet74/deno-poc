export interface Runtime {
  name: string;
  description: string;
  version: string;
  releaseDate: Date;
  isLatestRelease: boolean;
  website?: string;
}
