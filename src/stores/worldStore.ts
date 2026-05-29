import { create } from "zustand";
import { mockWorld } from "../mock/mockWorld";
import { WorldRegion } from "../types/world";
import { useUserStore } from "./userStore";

interface WorldState {
  regions: WorldRegion[];

  syncUnlocks: () => void;
  resetWorld: () => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  regions: mockWorld,

  syncUnlocks: () => {
    const userLevel = useUserStore.getState().level;

    set((state) => ({
      regions: state.regions.map((region) => ({
        ...region,
        unlocked: userLevel >= region.requiredLevel,
      })),
    }));
  },

  resetWorld: () => set({ regions: mockWorld }),
}));
