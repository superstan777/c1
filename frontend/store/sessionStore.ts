import { Exercise } from "@/types/types";
import { create } from "zustand";

type SessionState = {
  progress: number;
  exercises: Exercise[];
  updateProgress: () => void;
  resetProgress: () => void;
  setExercises: (initial: Exercise[]) => void;
  pushWrongAnswer: (exercise: Exercise) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  progress: 0,
  exercises: [],
  updateProgress: () => set((state) => ({ progress: state.progress + 1 })),

  resetProgress: () => set({ progress: 0 }),
  setExercises: (initial) => set({ exercises: [...initial] }),
  pushWrongAnswer: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
}));
