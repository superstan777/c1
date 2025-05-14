import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

import { usePersistedStore } from "@/lib/persistedStore";
import { queryClient } from "@/lib/queryClient";
import { useSessionStore } from "@/lib/sessionStore";
import { MOCKDATA } from "@/MOCKDATA";
import { getMillisecondsUntilMidnight } from "@/utils/getSecondsUntilMidnight";

export default function RootLayout() {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [mounted, setMounted] = useState(false);
  const { resetStreakIfMissed } = usePersistedStore();
  const { setExercises } = useSessionStore();

  const refetchExercises = () => {
    queryClient.invalidateQueries({ queryKey: ["exercises"] });
  };

  const checkStreakAndRefetch = () => {
    refetchExercises();
    const didReset = resetStreakIfMissed();
    if (didReset) {
      router.replace("/lostStreak");
    }
  };

  useEffect(() => {
    setExercises(MOCKDATA); // optional fallback
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    checkStreakAndRefetch(); // ✅ on app start

    // ✅ on midnight
    const timeoutId = setTimeout(() => {
      checkStreakAndRefetch();

      // schedule next midnight refetch recursively
      const newTimeout = setTimeout(
        checkStreakAndRefetch,
        getMillisecondsUntilMidnight() + 1000
      );
      return () => clearTimeout(newTimeout);
    }, getMillisecondsUntilMidnight() + 1000);

    // ✅ on app state change
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        checkStreakAndRefetch();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      clearTimeout(timeoutId);
    };
  }, [mounted]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="exercises" options={{ headerShown: false }} />
        <Stack.Screen name="lostStreak" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
