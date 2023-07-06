import axios from 'axios';
import { create } from 'zustand';
import { Hotel } from '../models';

type States = {
	hotels: Hotel[];
};

type Actions = {
	fetchHotels: () => Promise<void>;
};

const initialState: States = {
	hotels: [],
};

export const hotelStore = create<States & Actions>((set) => ({
	...initialState,

	fetchHotels: async () => {
		const data: Hotel[] = await (
			await axios.get('http://localhost:3001/hotel')
		).data;

		set((state) => ({
			...state,
			hotels: data,
		}));
	},

	reset: () => {
		set(initialState);
	},
}));
