import { create } from 'zustand';

interface User {
    id: string
    email: string;
    phoneNumber: string;
    lastName: string;
    birthDate: string;
    name: string;
    token: string;
    userState: string;
    loggedIn:boolean;
    userData: {[key: string]: any}
}

type Token = string; 

type IsAdmin = 'admin' | 'normal'

export interface UserState extends Array<any> {
    0: User,
    1: Token,
    2: IsAdmin,
    3: boolean
} 

export type States = {
    price: number;
    userState: UserState
    hotelsUserById: any[];
}

type Actions = {
    saveInfo: (arrayAux: States['userState']) => Promise<void>
    getHotelByUser: (hotelsArray: any[]) => Promise<void>
    resetToken: () => void
}

const initialState: States = {
    userState: [] as any,
    hotelsUserById: [],
    price: 0
}

export const tokenStore = create<States & Actions>((set) => ({
    ...initialState,

    saveInfo: async(arrayAux) => {
        set(() => ({
            userState: arrayAux
        }))
    },

    getHotelByUser: async(hotelsArray:any) => {
        set(() => ({
            hotelsUserById: hotelsArray
        }))
    },

    resetToken: () => {
		set(initialState);
	},
    
}))