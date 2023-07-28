import { create } from 'zustand';

type States = {
	hotels: boolean;
	coments: boolean;
    updated: boolean;
    users: boolean;
    rooms: boolean;
};

type Actions = {
	setHotels: ( boolean:boolean) => void;
    setComents: ( boolean:boolean) => void;
    setUpdated: ( boolean:boolean) => void;
    setUsers: (boolean: boolean) => void;
    setRooms: (boolean: boolean) => void;
};

const initialState: States = {
    users:false,
	hotels: false,
	coments: false,
    updated: false,
    rooms: false,
};

export const SAStore = create<States & Actions>((set) => ({
    ...initialState,
    setHotels: (boolean)=>{
        set((state) => ({
            ...state,
            hotels: boolean,
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
    },
    setRooms: (boolean) => {
        set((state) => ({
            ...state,
            rooms: boolean,
        }))
    }

}))