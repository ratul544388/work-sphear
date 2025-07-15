import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useViewModeStore = create(
  persist(
    (set) => ({
      viewMode: "table",
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "view-mode-storage",
    }
  )
);
