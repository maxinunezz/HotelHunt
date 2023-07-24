import axios from 'axios';
import { create } from 'zustand';
import calculatePageNumbers from '../utils/calculatePageNamber';
const url = import.meta.env.VITE_URL;

export interface Room {
	key: string;
	id: string;
	name: string;
	description: string;
	services: string[];
	photo: string[];
	pax: number;
	hotelId: string;
	price: string;
	floorNumber: string;
	disabled: boolean;
	hotelCategory: string;
}

type States = {
	rooms: Room[];
	allRoomsDashboard: Room[];
	roomsHotelSelect: Room[];
	roomDetail: Room[];
	currentPage: number;
	pageNumbers: number[];
};

type Actions = {
	fetchRooms: () => Promise<void>;
	fetchRoomsDashboard: (hotelId: string, token:string) => Promise<void>;
	hotelIdSetter: (roomsHotelSelected: []) => Promise<void>;
	setRoom: (roomDetail: string|undefined) => Promise<void>;
	changeCurrentPage: (payload: number | boolean) => void;
};

const initialState: States = {
	rooms: [],
	allRoomsDashboard: [],
	roomsHotelSelect: [],
	roomDetail: [],
	currentPage: 1,
	pageNumbers: [],
};

export const roomsStore = create<States & Actions>((set) => ({
	...initialState,

	fetchRooms: async () => {

		const { data } = await axios.get(`${url}/room`);


		if (data.length > 0) {
			set((state) => ({
				...state,
				rooms: data,
			}));
		}
	},
	fetchRoomsDashboard: async (hotelId, token) => {

		const { data } = await axios.get(`${url}/dashboard/room/${hotelId}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			});


		if (data.length > 0) {
			set((state) => ({
				...state,
				allRoomsDashboard: data,
			}));
		}
	},

	hotelIdSetter: async (roomsHotelSelected) => {
		const arrayAux: Room[] = [];


		return await axios.get(`${url}/room`).then((response) => {
			const allroomsAux = response.data;


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
				pageNumbers: calculatePageNumbers(arrayAux.length),
				currentPage: 1,
			}));
		});
	},

	setRoom: async (roomId) => {
		const auxArray: Room[] = [];
		return await axios.get(`${url}/room`).then((response) => {
			const allroomsAux = response.data;
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

	changeCurrentPage: (payload) => {
		set((state) => ({
			...state,
			currentPage:
				typeof payload === 'number'
					? payload
					: payload
						? state.currentPage + 1
						: state.currentPage - 1,
		}));
	},

	reset: () => {
		set(initialState);
	},
}));
