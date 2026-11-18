import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";

export default function SubjectsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 32,
  },
  title: {
    color: Colors.light.text,
    fontSize: 28,
    fontWeight: "700",
  },
});
