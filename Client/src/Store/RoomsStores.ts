import axios from 'axios';
import { create } from 'zustand';

interface Room {
	//UTILICE LA TABLA DE LA DB PARA SABER QUE TIPOS DE DATOS DEBO TRAERME, ASI LE ESPESIFICO A TYPESCRIP LOS TYPES.
	key: string;
	id: string;
	name: string;
	description: string;
	services: string;
	photo: string;
    pax: number;
    hotelId:string;
}

type States = {
	rooms: Room[];
	searchResoults: any[];
};

type Actions = {
	fetchRooms: () => Promise<void>;
};

const initialState: States = {
	rooms: [],
	searchResoults: [],
};

export const roomsStore = create<States & Actions>((set) => ({
	...initialState,

	fetchRooms: async () => {
		const data: Room[] = await (
			await axios.get('http://localhost:3001/room')
		).data;

		set((state) => ({
			...state,
			rooms: data,
		}));
	},

	reset: () => {
		set(initialState);
	},
}));
