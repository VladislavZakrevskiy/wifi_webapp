import { create } from 'zustand'
import { User } from '../../../types/User'
import { TgUser } from '../../../types/TGUser'

type State = {
    user: User | null
    tgUser: TgUser | null
    initData: Record<string, string> | null
}

type Action = {
    setUser: (user: User) => void
    setTGUser: (tgUser: TgUser) => void
    setInitData: (initData: Record<string, string>) => void
}

export const useUserStore = create<State & Action>((set) => ({
    user: null,
    initData: null,
    tgUser: null,
    setUser: (user) => set(() => ({ user })),
    setInitData: (initData) => set(() => ({ initData })),
    setTGUser: (tgUser) => set(() => ({ tgUser })),
}))
