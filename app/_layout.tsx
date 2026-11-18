import { Stack } from "expo-router";

import { AppShell } from "@/components/navigation/AppShell";

export default function RootLayout() {
  return (
    <AppShell>
      <Stack screenOptions={{ headerShown: false }} />
    </AppShell>
  );
}