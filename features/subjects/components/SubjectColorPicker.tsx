import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "@/constants/Colors";

const COLOR_OPTIONS = [
  "#2563EB",
  "#7C3AED",
  "#DB2777",
  "#DC2626",
  "#EA580C",
  "#CA8A04",
  "#16A34A",
  "#0D9488",
  "#0891B2",
  "#475569",
];

const isValidHexColor = (value: string): boolean =>
  /^#[0-9A-Fa-f]{6}$/.test(value);

interface SubjectColorPickerProps {
  color: string;
  disabled?: boolean;
  error?: string;
  onChange: (color: string) => void;
}

export function SubjectColorPicker({
  color,
  disabled = false,
  error,
  onChange,
}: SubjectColorPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Color</Text>
      <View style={styles.options} accessibilityRole="radiogroup">
        {COLOR_OPTIONS.map((option) => {
          const isSelected = color.toUpperCase() === option;
          return (
            <Pressable
              key={option}
              accessibilityLabel={`Seleccionar color ${option}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected, disabled }}
              disabled={disabled}
              onPress={() => onChange(option)}
              style={[
                styles.swatchButton,
                isSelected && styles.selectedSwatchButton,
              ]}
            >
              <View style={[styles.swatch, { backgroundColor: option }]} />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.customColorRow}>
        <View
          accessibilityLabel={`Vista previa del color ${color}`}
          style={[
            styles.colorPreview,
            isValidHexColor(color)
              ? { backgroundColor: color }
              : styles.invalidColorPreview,
          ]}
        />
        <TextInput
          accessibilityLabel="Código hexadecimal del color"
          autoCapitalize="characters"
          autoCorrect={false}
          editable={!disabled}
          maxLength={7}
          onChangeText={onChange}
          placeholder="#RRGGBB"
          placeholderTextColor={Colors.light.tabIconDefault}
          value={color}
          style={[styles.input, error ? styles.inputError : null]}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: "600",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  swatchButton: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 18,
    borderWidth: 2,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  selectedSwatchButton: {
    borderColor: Colors.light.text,
  },
  swatch: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  customColorRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  colorPreview: {
    borderColor: Colors.light.tabIconDefault,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 40,
  },
  invalidColorPreview: {
    backgroundColor: "#FFFFFF",
  },
  input: {
    borderColor: Colors.light.tabIconDefault,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    color: Colors.light.text,
    flex: 1,
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
});
