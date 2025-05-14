import { useSessionStore } from "@/lib/sessionStore";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LostStreakScreen() {
  const { resetProgress } = useSessionStore();

  const navigation = useNavigation();

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
      <Text style={styles.title}>Lost streak</Text>
      <Text style={styles.text}>Updated streak: 0</Text>
      {/* <Text style={styles.text}>
        You completed {progress} out of {MOCKDATA.length} exercises.
      </Text> */}

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Continue</Text>
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
