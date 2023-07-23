import { create } from 'zustand';

type States = {
	hotels: boolean;
	reserves: boolean;
	coments: boolean;
};

type Actions = {
	setHotels: ( boolean:boolean) => void;
	setReservs: ( boolean:boolean) => void;
    setComents: ( boolean:boolean) => void;
};

const initialState: States = {
	hotels: true,
	reserves: false,
	coments: false,
};

export const DashStore = create<States & Actions>((set) => ({
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

}))