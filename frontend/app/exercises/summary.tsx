import { usePersistedStore } from "@/lib/persistedStore";
import { useSessionStore } from "@/lib/sessionStore";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
export default function SummaryScreen() {
  const { progress, resetProgress } = useSessionStore();
  const { markDayComplete, streak } = usePersistedStore();

  const navigation = useNavigation();

  useEffect(() => {
    markDayComplete();
  }, []);

  const handleFinish = () => {
    resetProgress();

    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: "index" }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Summary</Text>
      <Text style={styles.text}>Updated streak: {streak}</Text>
      {/* <Text style={styles.text}>
        You completed {progress} out of {MOCKDATA.length} exercises.
      </Text> */}

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
