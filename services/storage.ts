import AsyncStorage from "@react-native-async-storage/async-storage";

import { APP_DATA_SCHEMA_VERSION, type AppData } from "@/types/app-data";
import type { Subject } from "@/types/subject";

const STORAGE_KEY = "planificador-academico:app-data";

export type StorageErrorCode =
  | "READ_FAILED"
  | "WRITE_FAILED"
  | "INVALID_JSON"
  | "INVALID_STATE"
  | "UNSUPPORTED_SCHEMA_VERSION";

export class LocalStorageError extends Error {
  readonly code: StorageErrorCode;
  readonly originalError: unknown;

  constructor(
    code: StorageErrorCode,
    message: string,
    originalError?: unknown,
  ) {
    super(message);
    this.name = "LocalStorageError";
    this.code = code;
    this.originalError = originalError;
  }
}

let operationQueue: Promise<void> = Promise.resolve();

function enqueue<T>(operation: () => Promise<T>): Promise<T> {
  const result = operationQueue.then(operation);
  operationQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invalidState(message: string): never {
  throw new LocalStorageError("INVALID_STATE", message);
}

function validateSubject(value: unknown, index: number): asserts value is Subject {
  if (!isRecord(value)) {
    invalidState(`La materia en la posición ${index} no es un objeto válido.`);
  }

  const fields: (keyof Subject)[] = [
    "id",
    "name",
    "color",
    "createdAt",
    "updatedAt",
  ];

  for (const field of fields) {
    if (typeof value[field] !== "string") {
      invalidState(
        `El campo "${field}" de la materia en la posición ${index} debe ser texto.`,
      );
    }
  }
}

function validateAppData(value: unknown): AppData {
  if (!isRecord(value)) {
    invalidState("El estado persistido debe ser un objeto.");
  }

  const schemaVersion = value.schemaVersion;
  if (typeof schemaVersion !== "number" || !Number.isInteger(schemaVersion)) {
    invalidState('El campo "schemaVersion" debe ser un número entero.');
  }

  if (schemaVersion !== APP_DATA_SCHEMA_VERSION) {
    throw new LocalStorageError(
      "UNSUPPORTED_SCHEMA_VERSION",
      `La versión de datos ${schemaVersion} no es compatible. Se esperaba ${APP_DATA_SCHEMA_VERSION}.`,
    );
  }

  const data = value.data;
  if (!isRecord(data) || !Array.isArray(data.subjects)) {
    invalidState('El estado debe contener un arreglo "data.subjects".');
  }

  const subjects: Subject[] = data.subjects.map(
    (subject: unknown, index: number) => {
      validateSubject(subject, index);
      return {
        id: subject.id,
        name: subject.name,
        color: subject.color,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt,
      };
    },
  );

  return {
    schemaVersion: APP_DATA_SCHEMA_VERSION,
    data: { subjects },
  };
}

async function readAppData(): Promise<AppData> {
  let serialized: string | null;
  try {
    serialized = await AsyncStorage.getItem(STORAGE_KEY);
  } catch (error) {
    throw new LocalStorageError(
      "READ_FAILED",
      "No se pudo leer el estado local.",
      error,
    );
  }

  if (serialized === null) {
    const initialData: AppData = {
      schemaVersion: APP_DATA_SCHEMA_VERSION,
      data: { subjects: [] },
    };
    await writeAppData(initialData);
    return initialData;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch (error) {
    throw new LocalStorageError(
      "INVALID_JSON",
      "El estado local contiene JSON inválido y no fue modificado.",
      error,
    );
  }

  return validateAppData(parsed);
}

async function writeAppData(value: unknown): Promise<AppData> {
  const validatedData = validateAppData(value);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(validatedData));
  } catch (error) {
    throw new LocalStorageError(
      "WRITE_FAILED",
      "No se pudo guardar el estado local.",
      error,
    );
  }
  return validatedData;
}

export function getAppData(): Promise<AppData> {
  return enqueue(readAppData);
}

export function updateAppData(
  update: (currentData: AppData) => AppData,
): Promise<AppData> {
  return enqueue(async () => {
    const currentData = await readAppData();
    return writeAppData(update(currentData));
  });
}
