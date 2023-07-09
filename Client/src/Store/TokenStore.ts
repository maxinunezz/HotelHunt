import axios from 'axios';
import { create } from 'zustand';

interface User {
    token: string;
    userState: string;
    loggedIn:boolean;
}

type States = {
    userState: User[];
}

type Actions = {
    saveInfo: (arrayAux) => Promise<void>
}

const initialState: States = {
    userState: []
}

export const tokenStore = create<States & Actions>((set) => ({
    ...initialState,

    saveInfo: async(arrayAux) => {
        set(() => ({
            userState: arrayAux
        }))
    }
}))