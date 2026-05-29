import { create } from "zustand";
import { mockPet } from "../mock/mockPet";
import { PetMood } from "../types/pet";

interface PetState {
  id: string;
  name: string;
  level: number;
  mood: PetMood;
  growth: number;

  gainGrowth: (amount: number) => void;
  setMood: (mood: PetMood) => void;
  resetPet: () => void;
}

const GROWTH_PER_LEVEL = 100;

export const usePetStore = create<PetState>((set) => ({
  ...mockPet,
  growth: 0,

  gainGrowth: (amount) =>
    set((state) => {
      const nextGrowthTotal = state.growth + amount;
      const levelGain = Math.floor(nextGrowthTotal / GROWTH_PER_LEVEL);

      return {
        growth: nextGrowthTotal % GROWTH_PER_LEVEL,
        level: state.level + levelGain,
        mood: "excited",
      };
    }),

  setMood: (mood) => set({ mood }),

  resetPet: () =>
    set({
      ...mockPet,
      growth: 0,
    }),
}));
