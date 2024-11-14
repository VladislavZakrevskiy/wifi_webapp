import { create } from 'zustand'
import { Rate } from '../../../types/Rate'

type State = {
    allRates: Rate<true>[]
    purchases: {
        type: Rate<true>
        pieces: number
    }[]
}

type Action = {
    increasePurchase: (rate_id: string) => void
    decreasePurchase: (rate_id: string) => void
    setAllRates: (rates: Rate<true>[]) => void
}

export const useCartStore = create<State & Action>((set) => ({
    allRates: [],
    purchases: [],
    increasePurchase: (rate_id) =>
        set((store) => {
            const newRate = store.allRates.find(({ id }) => id === rate_id)
            const purchaseRate = store.purchases.find(({ type }) => type.id === rate_id)
            if (purchaseRate) {
                return {
                    ...store,
                    purchases: [...store.purchases, { ...purchaseRate, pieces: purchaseRate.pieces + 1 }],
                }
            } else {
                return {
                    ...store,
                    purchases: [...store.purchases, { type: newRate!, pieces: 1 }],
                }
            }
        }),
    decreasePurchase: (rate_id) =>
        set((store) => {
            const purchaseRate = store.purchases.find(({ type }) => type.id === rate_id)
            if (purchaseRate) {
                return {
                    ...store,
                    purchases: [...store.purchases, { ...purchaseRate, pieces: purchaseRate?.pieces - 1 }],
                }
            } else return store
        }),
    setAllRates: (rates) => set(() => ({ allRates: rates })),
}))
