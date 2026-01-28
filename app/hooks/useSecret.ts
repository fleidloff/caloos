import { create } from "zustand";
import { persist } from "zustand/middleware";

type SecretState = {
  secret: string;
  hasHydrated: boolean;
  setSecret: (value: string) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSecret = create<SecretState>()(
  persist(
    (set) => ({
      secret: "",
      hasHydrated: false,
      setSecret: (value: string) => set({ secret: value }),
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: "secret-storage",
      partialize: (state) => ({ secret: state.secret }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
