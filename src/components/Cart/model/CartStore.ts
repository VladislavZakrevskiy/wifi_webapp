import { create } from "zustand";
import { Rate } from "../../../types/Rate";

type State = {
  allRates: Rate<true>[];
  purchase: Rate<true> | null;
};

type Action = {
  setAllRates: (rates: Rate<true>[]) => void;
  setPurchase: (rate_id: string) => void;
  deletePurchase: () => void;
};

export const useCartStore = create<State & Action>((set) => ({
  allRates: [],
  purchase: null,
  setPurchase: (rate_id) =>
    set((store) => ({ purchase: store.allRates.find(({ id }) => id === rate_id) })),
  deletePurchase: () => set(() => ({ purchase: null })),
  setAllRates: (rates) => set(() => ({ allRates: rates })),
}));
