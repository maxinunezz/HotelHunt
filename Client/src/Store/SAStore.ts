import { create } from 'zustand';

type States = {
	hotels: boolean;
	reserves: boolean;
	coments: boolean;
    updated: boolean;
    users: boolean
};

type Actions = {
	setHotels: ( boolean:boolean) => void;
	setReservs: ( boolean:boolean) => void;
    setComents: ( boolean:boolean) => void;
    setUpdated: ( boolean:boolean) => void;
    setUsers: (boolean: boolean) => void;
};

const initialState: States = {
    users:false,
	hotels: false,
	reserves: false,
	coments: false,
    updated: false,
};

export const SAStore = create<States & Actions>((set) => ({
    ...initialState,
    setHotels: (boolean)=>{
        set((state) => ({
            ...state,
            hotels: boolean,
        }))
    },
    setReservs: (boolean)=>{
        set((state) => ({
            ...state,
           reserves: boolean,
        }))
    },
    setComents: (boolean)=>{
        set((state) => ({
            ...state,
            coments: boolean,
        }))
    },
    setUpdated: (boolean)=>{
        set((state) => ({
            ...state,
            updated: boolean,
        }))
    },
    setUsers: (boolean) => {
        set((state) => ({
            ...state,
            users: boolean,
        }))
    }

}))