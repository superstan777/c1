import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSameDay, isYesterday, parseISO } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PersistedState = {
  streak: number;
  lastCompletionDate: string | null;
  resetStreakIfMissed: () => boolean;
  markDayComplete: () => void;
};

export const usePersistedStore = create<PersistedState>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastCompletionDate: null,

      resetStreakIfMissed: () => {
        const today = new Date();
        const lastDate = get().lastCompletionDate;

        if (lastDate) {
          const last = parseISO(lastDate);
          const missed = !isSameDay(last, today) && !isYesterday(last);
          if (missed) {
            set({ streak: 0 });
            return true;
          }
        }
        return false;
      },

      markDayComplete: () => {
        const todayStr = new Date().toISOString();
        const newStreak = get().streak + 1;
        set({
          lastCompletionDate: todayStr,
          streak: newStreak,
        });
      },
    }),
    {
      name: "exercise-persist1",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
