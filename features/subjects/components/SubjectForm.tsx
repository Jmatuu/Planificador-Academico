import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "@/constants/Colors";
import { LocalStorageError } from "@/services/storage";
import type { Subject } from "@/types/subject";

import { SubjectColorPicker } from "./SubjectColorPicker";
import {
  createSubject,
  DuplicateSubjectError,
  SubjectValidationError,
} from "../services/subjectsService";

interface SubjectFormProps {
  disabled?: boolean;
  onCreated: (subjects: Subject[]) => void;
}

export function SubjectForm({ disabled = false, onCreated }: SubjectFormProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#2563EB");
  const [nameError, setNameError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (isSaving || disabled) {
      return;
    }

    setNameError(null);
    setColorError(null);
    setSubmitError(null);
    setIsSaving(true);

    try {
      const savedData = await createSubject(name, color);
      onCreated(savedData.data.subjects);
      setName("");
    } catch (error) {
      if (error instanceof SubjectValidationError) {
        if (error.field === "name") {
          setNameError(error.message);
        } else {
          setColorError(error.message);
        }
      } else if (error instanceof DuplicateSubjectError) {
        setNameError(error.message);
      } else if (error instanceof LocalStorageError) {
        setSubmitError(`Error de almacenamiento: ${error.message}`);
      } else {
        console.error("Error inesperado al crear la materia.", error);
        setSubmitError(
          "Ocurrió un error inesperado al guardar la materia. Inténtalo de nuevo.",
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Nueva materia</Text>
      <View style={styles.formFields}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            accessibilityLabel="Nombre de la materia"
            autoCapitalize="words"
            autoCorrect={false}
            editable={!disabled && !isSaving}
            onChangeText={(value) => {
              setName(value);
              setNameError(null);
            }}
            onSubmitEditing={() => void handleSubmit()}
            placeholder="Ej. Matemáticas"
            placeholderTextColor={Colors.light.tabIconDefault}
            returnKeyType="done"
            value={name}
            style={[styles.input, nameError ? styles.inputError : null]}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>

        <SubjectColorPicker
          color={color}
          disabled={disabled || isSaving}
          error={colorError ?? undefined}
          onChange={(value) => {
            setColor(value);
            setColorError(null);
          }}
        />
      </View>

      {submitError ? (
        <Text accessibilityRole="alert" style={styles.submitError}>
          {submitError}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={disabled || isSaving}
        onPress={() => void handleSubmit()}
        style={({ pressed }) => [
          styles.submitButton,
          (disabled || isSaving) && styles.submitButtonDisabled,
          pressed && styles.submitButtonPressed,
        ]}
      >
        <Text style={styles.submitButtonText}>
          {isSaving ? "Guardando..." : "Agregar materia"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 18,
    padding: 20,
  },
  sectionTitle: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "700",
  },
  formFields: {
    gap: 18,
  },
  field: {
    gap: 8,
  },
  label: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderColor: Colors.light.tabIconDefault,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    color: Colors.light.text,
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: "#B91C1C",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
  },
  submitError: {
    color: "#B91C1C",
    fontSize: 14,
  },
  submitButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  submitButtonDisabled: {
    opacity: 0.55,
  },
  submitButtonPressed: {
    opacity: 0.8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
