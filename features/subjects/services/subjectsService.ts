import { updateAppData } from "@/services/storage";
import type { AppData } from "@/types/app-data";
import type { Subject } from "@/types/subject";

export type SubjectValidationField = "name" | "color";

export class SubjectValidationError extends Error {
  readonly field: SubjectValidationField;

  constructor(field: SubjectValidationField, message: string) {
    super(message);
    this.name = "SubjectValidationError";
    this.field = field;
  }
}

export class DuplicateSubjectError extends Error {
  constructor() {
    super("Ya existe una materia con ese nombre.");
    this.name = "DuplicateSubjectError";
  }
}

let subjectIdSequence = 0;

function createSubjectId(existingSubjects: readonly Subject[]): string {
  let id: string;

  do {
    subjectIdSequence += 1;
    id = [
      "subject",
      Date.now().toString(36),
      subjectIdSequence.toString(36),
      Math.random().toString(36).slice(2, 10),
    ].join("-");
  } while (existingSubjects.some((subject) => subject.id === id));

  return id;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export function createSubject(name: string, color: string): Promise<AppData> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new SubjectValidationError("name", "El nombre es obligatorio.");
  }

  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
    throw new SubjectValidationError(
      "color",
      "Ingresa un color hexadecimal válido en formato #RRGGBB.",
    );
  }

  const normalizedName = normalizeName(trimmedName);
  const normalizedColor = color.toUpperCase();
  const timestamp = new Date().toISOString();

  return updateAppData((currentData) => {
    if (
      currentData.data.subjects.some(
        (subject) => normalizeName(subject.name) === normalizedName,
      )
    ) {
      throw new DuplicateSubjectError();
    }

    const subject: Subject = {
      id: createSubjectId(currentData.data.subjects),
      name: trimmedName,
      color: normalizedColor,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    return {
      ...currentData,
      data: {
        ...currentData.data,
        subjects: [...currentData.data.subjects, subject],
      },
    };
  });
}
