import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { COLORS } from "@/consts/colors";
import { useSessionStore } from "@/store/sessionStore";

import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useExercisesQuery } from "@/lib/queries";

export default function ExerciseScreen() {
  const { id } = useLocalSearchParams();
  const { updateProgress } = useSessionStore();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [wasAnswered, setWasAnswered] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { exercises, pushWrongAnswer } = useSessionStore();

  const exercise = exercises?.[parseInt(id as string)] || {};
  const { question, hint, answer: correctAnswer } = exercise;

  const handleCheck = () => {
    Keyboard.dismiss();
    const isCorrect =
      answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    setFeedback(isCorrect ? "correct" : "incorrect");
    setWasAnswered(true);
    setModalVisible(true);

    if (isCorrect) {
      updateProgress();
    } else {
      pushWrongAnswer(exercise);
    }
  };

  const handleContinue = () => {
    const nextExerciseId = (parseInt(id as string) + 1).toString();
    if (exercises[parseInt(nextExerciseId)]) {
      router.replace(`/exercises/${nextExerciseId}`);
    } else {
      router.replace("/exercises/summary");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <View style={styles.inner}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Use correct tense</Text>
              <Text style={styles.exercise}>{question}</Text>
              <Text style={styles.hint}>{hint}</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={answer}
                  onChangeText={setAnswer}
                  placeholder="Type your answer"
                  multiline
                  textAlignVertical="top"
                  editable={!wasAnswered}
                />
              </View>
            </ScrollView>

            <Button
              title="CHECK"
              onPress={handleCheck}
              disabled={wasAnswered || answer.trim() === ""}
              variant="primary"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Modal
        visible={modalVisible}
        backgroundColor={
          feedback === "correct"
            ? COLORS.green.background
            : COLORS.red.background
        }
      >
        <View style={styles.modalContent}>
          <Text
            style={[
              styles.modalText,
              {
                color:
                  feedback === "correct"
                    ? COLORS.green.primary
                    : COLORS.red.primary,
              },
            ]}
          >
            {feedback === "correct" ? "Correct!" : "Incorrect"}
          </Text>

          {feedback === "incorrect" && (
            <Text style={[styles.modalAnswer, { color: COLORS.red.primary }]}>
              Correct answer: {correctAnswer}
            </Text>
          )}
        </View>

        <Button
          title="CONTINUE"
          onPress={handleContinue}
          variant={feedback === "correct" ? "primary" : "danger"}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  exercise: {
    fontSize: 18,
    marginBottom: 10,
  },
  hint: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },

  correctAnswer: {
    fontSize: 16,
    marginTop: 4,
    fontStyle: "italic",
    color: "gray",
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    padding: 20,
  },

  modalText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalAnswer: {
    fontSize: 16,
    marginBottom: 6,
  },
});
