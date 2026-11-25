import type { Subject } from "./subject";

export const APP_DATA_SCHEMA_VERSION = 1;

export interface AppData {
  schemaVersion: typeof APP_DATA_SCHEMA_VERSION;
  data: {
    subjects: Subject[];
  };
}
