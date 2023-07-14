import axios from 'axios';
import { create } from 'zustand';
import { ReserveBooking } from '../Pages/RoomPage/RoomPage';
import { array } from 'yup';


type States = {
	reserves: ReserveBooking[];
};

type Actions = {
	reserveRoomPayment: (data: {}) => Promise<void>;
	reset: () => void;
};

const initialState: States = {
	reserves: [],
};

export const userStore = create<States & Actions>((set) => ({
	...initialState,

	reserveRoomPayment: async (data) => {
	try {

        const arrayAux:[] = []
        arrayAux.push(data)
        set((state)=>  ({...state, reserves:arrayAux}))
        	
        		 
        		
    } catch (error) {
        console.log(error)
    }
	},

	reset: () => {
		set(initialState);
	},
}));