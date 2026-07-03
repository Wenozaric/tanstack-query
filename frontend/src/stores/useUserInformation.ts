import { create } from 'zustand'

interface UserInformation{
    username: string | null,
    age: number | null,
    isOld: boolean | null,

    setAge: (data: number) => void
}

export const useUserInfromation = create<UserInformation>((set) => ({
    username: null,
    age: null,
    isOld: null,

    setAge: (data) => {
        data >= 18 ? set({ isOld: true}) : set({ isOld: false})
    }
}))