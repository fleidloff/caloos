import { create } from "zustand";

type SecretState = {
  secret: string;
  setSecret: (value: string) => void;
};

export const useSecret = create<SecretState>((set) => ({
  secret: "",
  setSecret: (value: string) => set({ secret: value }),
}));
