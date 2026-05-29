import { create } from "zustand";
import { mockUser } from "../mock/mockUser";

interface UserState {
  id: string;
  name: string;
  level: number;
  xp: number;
  streakDays: number;

  addXp: (amount: number) => void;
  resetUser: () => void;
}

const XP_PER_LEVEL = 100;

export const useUserStore = create<UserState>((set) => ({
  ...mockUser,

  addXp: (amount) =>
    set((state) => {
      const nextXpTotal = state.xp + amount;
      const levelGain = Math.floor(nextXpTotal / XP_PER_LEVEL);

      return {
        xp: nextXpTotal % XP_PER_LEVEL,
        level: state.level + levelGain,
      };
    }),

  resetUser: () => set({ ...mockUser }),
}));
