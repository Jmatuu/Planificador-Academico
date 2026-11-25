import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";

import { navigationItems } from "./navigationItems";

type NavigationSidebarProps = {
  onNavigate?: () => void;
};

export function NavigationSidebar({ onNavigate }: NavigationSidebarProps) {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>Planificador Académico</Text>
        {onNavigate ? (
          <Pressable
            accessibilityLabel="Cerrar menú"
            accessibilityRole="button"
            onPress={onNavigate}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.navigation}>
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              asChild
              href={item.href}
              key={item.href}
              onPress={onNavigate}
            >
              <Pressable
                accessibilityRole="link"
                accessibilityState={{ selected: isActive }}
                style={StyleSheet.flatten([
                  styles.link,
                  isActive && styles.activeLink,
                ])}
              >
                <Text
                  style={[
                    styles.linkText,
                    isActive && styles.activeLinkText,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    minHeight: 40,
  },
  brand: {
    color: Colors.light.text,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "700",
  },
  closeButton: {
    marginLeft: 12,
    padding: 8,
  },
  closeButtonText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  navigation: {
    flex: 1,
  },
  link: {
    borderLeftColor: "transparent",
    borderLeftWidth: 3,
    marginBottom: 6,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  activeLink: {
    borderLeftColor: Colors.light.tint,
  },
  linkText: {
    color: Colors.light.text,
    fontSize: 16,
  },
  activeLinkText: {
    fontWeight: "700",
  },
});
