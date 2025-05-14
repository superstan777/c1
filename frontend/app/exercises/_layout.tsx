import { ProgressBar } from "@/components/ProgressBar";
import { useSessionStore } from "@/lib/sessionStore";

import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExercisesLayout() {
  const { top } = useSafeAreaInsets();
  const { progress } = useSessionStore();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, marginTop: top }}>
        <ProgressBar progress={progress} />
        <Stack>
          <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
      </View>
    </View>
  );
}
