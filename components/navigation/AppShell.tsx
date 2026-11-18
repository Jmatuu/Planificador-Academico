import { useEffect, useState, type PropsWithChildren } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import Colors from "@/constants/Colors";

import { NavigationSidebar } from "./NavigationSidebar";

const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_SIDEBAR_WIDTH = 256;
const MOBILE_DRAWER_MAX_WIDTH = 320;

export function AppShell({ children }: PropsWithChildren) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setIsDrawerOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isDrawerOpen || isDesktop || Platform.OS !== "web") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, isDesktop]);

  const closeDrawer = () => setIsDrawerOpen(false);
  const drawerWidth = Math.min(width * 0.84, MOBILE_DRAWER_MAX_WIDTH);

  return (
    <View style={styles.root}>
      {isDesktop ? (
        <View style={styles.desktopSidebar}>
          <NavigationSidebar />
        </View>
      ) : null}

      <View style={styles.main}>
        {!isDesktop ? (
          <View style={styles.mobileHeader}>
            <Pressable
              accessibilityLabel="Abrir menú de navegación"
              accessibilityRole="button"
              accessibilityState={{ expanded: isDrawerOpen }}
              onPress={() => setIsDrawerOpen(true)}
              style={styles.menuButton}
            >
              <Text style={styles.menuButtonText}>Menú</Text>
            </Pressable>
            <Text style={styles.mobileBrand}>Planificador Académico</Text>
          </View>
        ) : null}

        <View style={styles.content}>{children}</View>
      </View>

      {!isDesktop && isDrawerOpen ? (
        <View style={styles.drawerOverlay}>
          <Pressable
            accessibilityLabel="Cerrar menú"
            accessibilityRole="button"
            onPress={closeDrawer}
            style={styles.backdrop}
          />
          <View style={[styles.drawer, { width: drawerWidth }]}>
            <NavigationSidebar onNavigate={closeDrawer} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.background,
    flex: 1,
    flexDirection: "row",
  },
  desktopSidebar: {
    borderRightColor: Colors.light.tabIconDefault,
    borderRightWidth: StyleSheet.hairlineWidth,
    flexShrink: 0,
    width: DESKTOP_SIDEBAR_WIDTH,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  mobileHeader: {
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderBottomColor: Colors.light.tabIconDefault,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    minHeight: 56,
    paddingHorizontal: 16,
  },
  menuButton: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  menuButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "600",
  },
  mobileBrand: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  drawerOverlay: {
    flexDirection: "row",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  drawer: {
    backgroundColor: Colors.light.background,
    elevation: 10,
    height: "100%",
    maxWidth: MOBILE_DRAWER_MAX_WIDTH,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 1,
  },
});
