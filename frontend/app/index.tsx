import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { usePersistedStore } from "@/lib/persistedStore";
import { getMillisecondsUntilMidnight } from "@/utils/getSecondsUntilMidnight";

export default function Index() {
  const { streak } = usePersistedStore();
  const router = useRouter();
  const [msLeft, setMsLeft] = useState(getMillisecondsUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setMsLeft(getMillisecondsUntilMidnight());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleStart = () => {
    router.replace("/exercises/0");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.countdownText}>🔥 {streak}</Text>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <Text style={styles.countdownText}>{formatTime(msLeft)}</Text>
      </View>
    </SafeAreaView>
  );
}

function formatTime(ms: number): string {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num: number): string {
  return num.toString().padStart(2, "0");
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  streakText: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  countdownText: {
    marginVertical: 24,
    fontSize: 16,
    color: "gray",
  },
});
