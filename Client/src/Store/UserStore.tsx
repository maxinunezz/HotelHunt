import axios from 'axios';
import { create } from 'zustand';
import { ReserveBooking } from '../Pages/RoomPage/RoomPage';
import { array } from 'yup';


type States = {
	reserves: ReserveBooking[];
	urlPayment: string | null;
};

type Actions = {
	reserveRoomPayment: (data: []) => Promise<void>;
	roomPayment: (data: {}) => Promise<void>
	reset: () => void;
};

const initialState: States = {
	reserves: [],
	urlPayment: null,
};

export const userStore = create<States & Actions>((set) => ({
	...initialState,

	reserveRoomPayment: async (data) => {
	try {

		
		
       
        set((state)=>  ({...state,reserves:data}))
		
    } catch (error) {
        console.log(error)
    }
	},

	reset: () => {
		set(initialState);
	},


	roomPayment: async (info)=>{
		try {

		
			
			const {data} = await axios.post('http://localhost:3001/booking/reserva', info);
	  
			const urlPayment =data.urlpago; // Ajusta esto según la estructura de la respuesta del backend
	  console.log(urlPayment);
	  
			set({ urlPayment });
		  } catch (error) {
			console.log(error);
		  }}
		
	
}));