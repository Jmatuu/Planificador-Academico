import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import Colors from "@/constants/Colors";
import { SubjectForm } from "@/features/subjects/components/SubjectForm";
import { SubjectList } from "@/features/subjects/components/SubjectList";
import { LocalStorageError, getAppData } from "@/services/storage";
import type { Subject } from "@/types/subject";

export default function SubjectsScreen() {
  const { width } = useWindowDimensions();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setLoadError(null);

    getAppData()
      .then((appData) => {
        if (isActive) {
          setSubjects(appData.data.subjects);
        }
      })
      .catch((error: unknown) => {
        console.error("No se pudieron cargar las materias.", error);
        if (isActive) {
          setLoadError(
            error instanceof LocalStorageError
              ? error.message
              : "Ocurrió un error inesperado al cargar las materias.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const contentPadding = width < 600 ? 16 : 32;

  return (
    <View style={[styles.container, { padding: contentPadding }]}>
      <Text style={styles.title}>Materias</Text>
      <SubjectForm
        disabled={isLoading || loadError !== null}
        onCreated={setSubjects}
      />

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Materias registradas</Text>
        {isLoading ? (
          <View style={styles.statusContainer}>
            <ActivityIndicator color={Colors.light.tint} />
            <Text style={styles.statusText}>Cargando materias...</Text>
          </View>
        ) : loadError ? (
          <View style={styles.errorContainer}>
            <Text accessibilityRole="alert" style={styles.loadError}>
              No se pudieron cargar las materias: {loadError}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setRetryCount((count) => count + 1)}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <SubjectList subjects={subjects} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    gap: 24,
    padding: 32,
  },
  title: {
    color: Colors.light.text,
    fontSize: 28,
    fontWeight: "700",
  },
  sectionTitle: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "700",
  },
  listSection: {
    flex: 1,
    gap: 14,
    minHeight: 160,
  },
  statusContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  statusText: {
    color: "#64748B",
    fontSize: 14,
  },
  errorContainer: {
    alignItems: "flex-start",
    gap: 12,
  },
  loadError: {
    color: "#B91C1C",
    fontSize: 14,
  },
  retryButton: {
    borderColor: Colors.light.tint,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 40,
    paddingHorizontal: 14,
  },
  retryButtonText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: "600",
  },
});
