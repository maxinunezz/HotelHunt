import axios from 'axios';
import { create } from 'zustand';

interface User {
    name: ReactNode;
    token: string;
    userState: string;
    loggedIn:boolean;
    userData: {}
}

type States = {
    userState: User[];
    hotelsUserById: any[];
}

type Actions = {
    saveInfo: (arrayAux) => Promise<void>
    getHotelByUser: (hotelsArray) => Promise<void>
    reset: () => void
}

const initialState: States = {
    userState: [],
    hotelsUserById: []
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

    reset: () => {
		set(initialState);
	},
    
}))