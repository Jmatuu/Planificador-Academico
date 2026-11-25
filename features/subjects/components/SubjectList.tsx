import { FlatList, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import type { Subject } from "@/types/subject";

interface SubjectListProps {
  subjects: Subject[];
}

export function SubjectList({ subjects }: SubjectListProps) {
  if (subjects.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Aún no tienes materias</Text>
        <Text style={styles.emptyDescription}>
          Agrega tu primera materia con el formulario.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={subjects}
      keyExtractor={(subject) => subject.id}
      renderItem={({ item }) => (
        <View style={styles.subjectItem}>
          <View
            accessibilityLabel={`Color ${item.color}`}
            style={[styles.colorIndicator, { backgroundColor: item.color }]}
          />
          <Text style={styles.subjectName}>{item.name}</Text>
        </View>
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    gap: 10,
    paddingBottom: 8,
  },
  subjectItem: {
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 12,
    minHeight: 56,
    paddingHorizontal: 14,
  },
  colorIndicator: {
    borderRadius: 8,
    height: 28,
    width: 28,
  },
  subjectName: {
    color: Colors.light.text,
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    borderColor: "#E2E8F0",
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    gap: 8,
    justifyContent: "center",
    minHeight: 150,
    padding: 24,
  },
  emptyTitle: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "700",
  },
  emptyDescription: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
  },
});
