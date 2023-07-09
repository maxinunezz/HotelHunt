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
	hotelId: string;
	price: string;
}

type States = {
	rooms: Room[];
	roomsHotelSelect: Room[];
	roomDetail: Room[];
};

type Actions = {
	fetchRooms: () => Promise<void>;
	hotelIdSetter: (roomsHotelSelected: []) => Promise<void>;
	setRoom: (roomDetail: []) => Promise<void>;
};

const initialState: States = {
	rooms: [],
	roomsHotelSelect: [],
	roomDetail: [],
};

export const roomsStore = create<States & Actions>((set) => ({
	...initialState,

	fetchRooms: async () => {
		return await axios.get(`http://localhost:3001/room`).then((response) => {
			if (response.data.length > 0) {
				const allRooms = response.data;
				set((state) => ({
					...state,
					rooms: allRooms,
				}));
			}
		});
	},
	hotelIdSetter: async (roomsHotelSelected) => {
		const arrayAux: Room[] = [];
		console.log('roomsHotelSelected' + roomsHotelSelected);

		return await axios.get(`http://localhost:3001/room`).then((response) => {
			const allroomsAux = response.data;
			console.log(allroomsAux);

			for (let i = 0; i < roomsHotelSelected?.length; i++) {
				for (let j = 0; j < allroomsAux.length; j++) {
					if (roomsHotelSelected[i] === allroomsAux[j].id) {
						arrayAux.push(allroomsAux[j]);
					}
				}
			}
			set((state) => ({
				...state,
				roomsHotelSelect: arrayAux,
			}));
		});
	},
	setRoom: async (roomId) => {
		const auxArray: Room[] = [];
		return await axios.get(`http://localhost:3001/room`).then((response) => {
			const allroomsAux = response.data;
			console.log(allroomsAux);
			for (let i = 0; i < allroomsAux?.length; i++) {
				if (allroomsAux[i].id === roomId) {
					auxArray.push(allroomsAux[i]);
				}
			}

			set((state) => ({
				...state,
				roomDetail: auxArray,
			}));
		});
	},
	reset: () => {
		set(initialState);
	},
}));
